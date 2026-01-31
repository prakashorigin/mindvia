const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 MongoDB Connection with Enhanced Debugging
let mongoConnected = false;

const connectMongoDB = async () => {
  try {
    console.log("\n🔄 Connecting to MongoDB...");
    console.log("📍 URI:", process.env.MONGO_URI?.substring(0, 60) + "...");
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000
    });
    
    mongoConnected = true;
    console.log("✅ MongoDB Atlas Connected Successfully!\n");
  } catch (err) {
    mongoConnected = false;
    console.error("\n❌ MongoDB Connection Failed!");
    console.error("Error:", err.message);
    console.error("\n⚠️  TROUBLESHOOTING STEPS:");
    console.error("1. Check .env file - MONGO_URI is correct?");
    console.error("2. Verify cluster name (cluster0.xxxxx NOT cluster0.abcd1)");
    console.error("3. Check username and password in URI");
    console.error("4. Go to MongoDB Atlas → Network Access → Allow 0.0.0.0/0");
    console.error("5. Check database user exists (mindviaUser)\n");
    
    setTimeout(connectMongoDB, 5000);
  }
};

connectMongoDB();

// Import User Model
const User = require("./models/User");

// 🏥 Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: mongoConnected ? "✅ Running" : "❌ Failed",
    mongodb: mongoConnected ? "✅ Connected" : "❌ Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
// ✅ Register Route (Enhanced)
app.post("/api/auth/register", async (req, res) => {
  try {
    console.log("\n📝 Registration Request:");
    console.log("  Name:", req.body.name);
    console.log("  Email:", req.body.email);
    console.log("  Password Length:", req.body.password?.length);

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ message: "❌ Password must be at least 6 characters" });
    }

    // Check existing user
    console.log("🔍 Checking if email exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already registered:", email);
      return res.status(400).json({ message: "❌ Email already exists" });
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    console.log("💾 Saving user to database...");
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("✅ User registered successfully!\n");

    res.status(201).json({ 
      message: "✅ User Registered Successfully", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    console.error("Details:", error);
    res.status(500).json({ 
      message: "❌ Registration failed", 
      error: error.message 
    });
  }
});

// 🔐 Login Route (Enhanced)
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("\n🔐 Login Request:", req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "❌ Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "❌ Invalid Email or Password" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "❌ Invalid Email or Password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login successful!\n");

    res.json({
      message: "✅ Login Successful",
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "❌ Login failed", error: error.message });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Mindvia Backend Running",
    mongodb: mongoConnected ? "✅ Connected" : "❌ Disconnected",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      health: "GET /api/health"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.message);
  res.status(500).json({ message: "❌ Server error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 To stop: Press Ctrl+C`);
  console.log(`🧪 Test: curl http://localhost:${PORT}/api/health\n`);
});
