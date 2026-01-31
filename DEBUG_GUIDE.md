# 🔍 Registration Troubleshooting Guide

## ❌ Common Registration Failures & Fixes

---

## 🔴 **MAIN ISSUE: MongoDB URI Not Updated**

The `.env` file has a **placeholder** MongoDB URI:

```
MONGO_URI=mongodb+srv://mindviaUser:Mindvia%40123@cluster0.abcd1.mongodb.net/mindviaDB
```

### ⚠️ Problems:

- `cluster0.abcd1` - This is NOT your real cluster name
- Database won't connect
- Registration fails silently
- Backend doesn't show "✅ MongoDB Atlas Connected"

---

## ✅ FIX: Update MongoDB URI

### Step 1: Get Your Real MongoDB URI

**Go to**: https://cloud.mongodb.com/

**Click**: Database → Connect → Drivers

**Copy**: Connection string

Example real URI:

```
mongodb+srv://mindviaUser:Mindvia%40123@cluster0.xyz1abc.mongodb.net/mindviaDB
```

### Step 2: Update .env File

```bash
nano backend/.env
```

Replace:

```
MONGO_URI=mongodb+srv://mindviaUser:Mindvia%40123@cluster0.abcd1.mongodb.net/mindviaDB
```

With your real URI:

```
MONGO_URI=mongodb+srv://mindviaUser:Mindvia%40123@cluster0.xyz1abc.mongodb.net/mindviaDB
```

Save: `Ctrl+X → Y → Enter`

---

## 🧪 How to Debug Registration Issues

### 1. **Check Backend Console**

Look for this message when starting:

```
✅ MongoDB Atlas Connected
✅ Server running on http://localhost:5000
```

❌ If you see error instead:

```
❌ MongoDB Connection Error: ...
```

**Then**: MongoDB URI is wrong in .env

---

### 2. **Check Browser Console**

1. Open registration page
2. Press `F12` (Open DevTools)
3. Click "Console" tab
4. Try to register
5. Look for error message

**Common errors:**

- ❌ `Failed to fetch` - Backend not running
- ❌ `CORS error` - Backend not started
- ❌ `Network error` - Check URL in script.js

---

### 3. **Check MongoDB Atlas**

**Go to**: https://cloud.mongodb.com/

1. Click "Browse Collections"
2. Select "mindviaDB"
3. Look for "users" collection
4. You should see registered users there

If collection is empty:

- Registration didn't reach database
- Check backend console for errors

---

### 4. **Test API Manually**

Using curl or Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123"
  }'

# Should return:
# {"message":"✅ User Registered Successfully","user":{...}}
```

---

## 🛠️ Improved Backend Code (With Better Debugging)

Replace your `backend/server.js` with this enhanced version that shows detailed errors:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 DETAILED MongoDB Connection with Retry
let mongoConnected = false;

const connectMongoDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("📍 URI:", process.env.MONGO_URI?.substring(0, 50) + "...");

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000 // 10 second timeout
    });

    mongoConnected = true;
    console.log("✅ MongoDB Atlas Connected Successfully!");
  } catch (err) {
    mongoConnected = false;
    console.error("❌ MongoDB Connection Failed!");
    console.error("Error Details:", err.message);
    console.error("\n⚠️  TROUBLESHOOTING:");
    console.error("1. Check MONGO_URI in .env file");
    console.error("2. Verify username and password");
    console.error("3. Check MongoDB Atlas IP whitelist");
    console.error("4. Ensure network access is allowed (0.0.0.0/0)\n");

    // Retry connection after 5 seconds
    setTimeout(connectMongoDB, 5000);
  }
};

connectMongoDB();

// Import User Model
const User = require("./models/User");

// 🛡️ Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: mongoConnected ? "✅ Connected" : "❌ Disconnected",
    mongodb: mongoConnected,
    timestamp: new Date().toISOString()
  });
});

// ✅ Register Route (Enhanced with Logging)
app.post("/api/auth/register", async (req, res) => {
  try {
    console.log("\n📝 Registration Request Received");
    console.log("Data:", {
      name: req.body.name,
      email: req.body.email,
      passwordLength: req.body.password?.length
    });

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    console.log("💾 Creating user in database...");
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("✅ User registered successfully:", email);

    res.status(201).json({
      message: "✅ User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

// 🔐 Login Route (Enhanced)
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("\n🔐 Login Request Received:", req.body.email);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login successful:", email);

    res.json({
      message: "✅ Login Successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Mindvia Backend Running",
    mongodb: mongoConnected ? "✅ Connected" : "❌ Disconnected"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log("📝 Tip: Use Ctrl+C to stop server\n`);
});
```

---

## 🧪 Improved Frontend Code (Better Error Display)

```javascript
const API = "http://localhost:5000/api/auth";

async function register() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  if (!name?.value || !email?.value || !password?.value) {
    showMessage("❌ All fields are required", "error", messageDiv);
    return;
  }

  if (password.value.length < 6) {
    showMessage(
      "❌ Password must be at least 6 characters",
      "error",
      messageDiv,
    );
    return;
  }

  showMessage("⏳ Registering... Please wait", "info", messageDiv);

  try {
    console.log("📤 Sending registration request...");

    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    console.log("📥 Response:", data);

    if (response.ok) {
      showMessage("✅ " + data.message, "success", messageDiv);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
      document.getElementById("registerForm").reset();
    } else {
      showMessage(
        "❌ " + (data.message || "Registration failed"),
        "error",
        messageDiv,
      );
    }
  } catch (error) {
    console.error("🚨 Fetch Error:", error);
    showMessage(
      "❌ Registration Error: " +
        error.message +
        "\n💡 Check backend is running!",
      "error",
      messageDiv,
    );
  }
}

function showMessage(message, type, element) {
  element.textContent = message;
  element.className = "message " + type;
  setTimeout(() => {
    element.className = "message";
  }, 5000);
}
```

---

## ✅ Testing Checklist

After making changes:

- [ ] Stop backend: `Ctrl+C`
- [ ] Update `.env` with real MongoDB URI
- [ ] Start backend: `npm start`
- [ ] Check: "✅ MongoDB Atlas Connected" appears
- [ ] Open registration page
- [ ] Press `F12` → Console
- [ ] Try registering
- [ ] Check console for logs
- [ ] Go to MongoDB Atlas → Browse Collections
- [ ] See new user in database

---

## 📊 Verify in MongoDB Atlas

1. **Login**: cloud.mongodb.com
2. **Click**: Database
3. **Click**: Browse Collections
4. **Select**: mindviaDB
5. **Open**: users collection
6. **Should see**: Document like:
   ```json
   {
     "_id": ObjectId("..."),
     "name": "Prakash Sharma",
     "email": "sharma019prakash@gmail.com",
     "password": "$2a$10$...", // encrypted
     "createdAt": ISODate("..."),
     "updatedAt": ISODate("...")
   }
   ```

---

## 🆘 Still Not Working?

1. **Check backend console** - Are you seeing connection message?
2. **Check browser console** (F12) - What error appears?
3. **Check MongoDB URI** - Is it correct with your cluster name?
4. **Check IP whitelist** - Is 0.0.0.0/0 allowed in MongoDB Atlas?
5. **Check database user** - Username and password correct?

Run this command to test:

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"✅ Connected","mongodb":true}`

---

**Need help? Check the detailed error messages in the backend console!**
