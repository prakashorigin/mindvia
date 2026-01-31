# 🚀 Mindvia Setup Guide - Complete Instructions

## ✅ What's Been Done

Your **Mindvia Full Stack Project** is now ready with:

### ✨ Advanced Features:

- ✅ **Password Hashing** - bcryptjs for secure passwords
- ✅ **JWT Authentication** - Token-based authentication
- ✅ **MongoDB Atlas** - Cloud database
- ✅ **Express Server** - RESTful API
- ✅ **Beautiful UI** - Responsive design with CSS
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Input Validation** - Form validation
- ✅ **CORS Enabled** - Frontend-Backend communication

---

## 📁 Project Structure

```
mindvia/
├── backend/
│   ├── server.js              ✅ Main server (Express + MongoDB)
│   ├── .env                   ✅ Environment variables (MongoDB URI)
│   ├── package.json           ✅ Dependencies
│   ├── models/
│   │   ├── User.js            ✅ User schema with validation
│   │   ├── Course.js          📦 Future: Course management
│   │   └── Progress.js        📦 Future: Progress tracking
│   └── config/
│       └── db.js              📦 Future: Database config
│
├── frontend/
│   ├── index.html             ✅ Home page
│   ├── register.html          ✅ Registration form
│   ├── login.html             ✅ Login form
│   ├── style.css              ✅ Beautiful styling
│   └── script.js              ✅ Frontend API calls
│
├── README.md                  ✅ Project documentation
├── .gitignore                 ✅ Git ignore rules
└── package.json               ✅ Root package.json
```

---

## 🔧 Step-by-Step Setup

### Step 1: MongoDB Atlas Setup

1. **Go to MongoDB Atlas** → https://cloud.mongodb.com/
2. **Login or Create Account** (Free tier available)
3. **Create Cluster**
   - Click "Create a Deployment"
   - Choose "M0 Free"
   - Select your region
   - Click "Create"

4. **Create Database User**
   - Go to "Database Access"
   - Add Database User
   - **Username:** `mindviaUser`
   - **Password:** `Mindvia@123`
   - Role: "Built-in role" → "Atlas admin"
   - Click "Add User"

5. **Allow Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**
   - Go to "Database"
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>`

7. **Update `.env` file**
   ```bash
   nano backend/.env
   ```
   Paste your MongoDB URI:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://mindviaUser:Mindvia%40123@cluster0.xxxxx.mongodb.net/mindviaDB
   JWT_SECRET=mindvia_secret_key_2026
   NODE_ENV=development
   ```

### Step 2: Install Dependencies

```bash
# From project root
cd backend
npm install
```

**Installed packages:**

- `express` - Web framework
- `mongoose` - MongoDB connector
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Step 3: Start Backend Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

**Expected Output:**

```
✅ MongoDB Atlas Connected
✅ Server running on http://localhost:5000
```

### Step 4: Open Frontend

**Option A: Using Live Server (VS Code)**

- Right-click `frontend/index.html`
- Select "Open with Live Server"

**Option B: Using Python**

```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option C: Direct Opening**

- Just open `frontend/index.html` in browser

---

## 🧪 Testing the Application

### Test 1: Register a User

1. Open http://localhost:8000 (or your frontend URL)
2. Click **"Register"**
3. Fill in:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
4. Click **"Register"**
5. **Expected:** ✅ Registration successful → Redirects to login

### Test 2: Check MongoDB

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Browse Collections"**
3. Select **"mindviaDB"** → **"users"**
4. **See:** Your registered user with hashed password

### Test 3: Login

1. Go to http://localhost:8000
2. Click **"Login"**
3. Use credentials from registration
4. **Expected:** ✅ Login successful → Token stored

---

## 📡 API Endpoints

### Register: `POST /api/auth/register`

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 201):**

```json
{
  "message": "✅ User Registered Successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "hashed_password_here",
    "createdAt": "2026-01-31T10:30:00Z"
  }
}
```

### Login: `POST /api/auth/login`

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**

```json
{
  "message": "✅ Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🔐 Security Features Implemented

| Feature               | Technology      | Purpose                       |
| --------------------- | --------------- | ----------------------------- |
| Password Hashing      | bcryptjs        | Secure password storage       |
| JWT Tokens            | jsonwebtoken    | Stateless authentication      |
| Email Validation      | Mongoose        | Valid email format            |
| Password Validation   | Mongoose        | Min 6 characters              |
| Input Sanitization    | express.json()  | Prevent injection attacks     |
| CORS                  | cors middleware | Control cross-origin requests |
| Environment Variables | dotenv          | Hide sensitive data           |

---

## 🐛 Troubleshooting

### ❌ MongoDB Connection Failed

**Problem:** `Connection refused` or `Authentication failed`

**Solution:**

```bash
# Check your .env file
cat backend/.env

# Verify:
# 1. MONGO_URI is correct
# 2. Username and password match MongoDB Atlas
# 3. IP address is whitelisted
# 4. MongoDB cluster is running
```

### ❌ CORS Error in Console

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**

- Backend has `cors()` enabled by default
- Check that backend is running on port 5000
- Check API URL in `script.js`

### ❌ Port 5000 Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### ❌ Dependencies Not Installing

**Problem:** `npm ERR! code ERESOLVE`

**Solution:**

```bash
# Force install
npm install --legacy-peer-deps
```

---

## 📚 File Descriptions

### Backend Files

| File             | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| `server.js`      | Express app, routes, MongoDB connection            |
| `.env`           | Secure configuration (PORT, MONGO_URI, JWT_SECRET) |
| `models/User.js` | User schema with validation                        |
| `package.json`   | Dependencies and scripts                           |

### Frontend Files

| File            | Purpose                     |
| --------------- | --------------------------- |
| `index.html`    | Home page with navigation   |
| `register.html` | User registration form      |
| `login.html`    | User login form             |
| `style.css`     | Beautiful responsive design |
| `script.js`     | API calls and form handling |

---

## 🚀 Next Steps (Advanced Features)

### Phase 2: Add Dashboard

```javascript
// Create dashboard.html after login
// Show user profile and courses
```

### Phase 3: Add Email Verification

```javascript
// Send verification email on registration
// Nodemailer package
```

### Phase 4: Add Course Management

```javascript
// Create courses
// Enroll in courses
// Track progress
```

### Phase 5: Deployment

```bash
# Backend: Heroku, Render, Railway
# Frontend: Vercel, Netlify, GitHub Pages
```

---

## 📊 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 Useful Links

- 🗄️ [MongoDB Atlas](https://cloud.mongodb.com/)
- 🚀 [Express Documentation](https://expressjs.com/)
- 📚 [Mongoose Docs](https://mongoosejs.com/)
- 🔐 [bcryptjs NPM](https://www.npmjs.com/package/bcryptjs)
- 🎫 [JWT Guide](https://jwt.io/)

---

## ✅ Verification Checklist

- [ ] `.env` file created with MongoDB URI
- [ ] `npm install` completed successfully
- [ ] Backend starts without errors
- [ ] MongoDB connection shows: "✅ MongoDB Atlas Connected"
- [ ] Frontend opens in browser
- [ ] Registration form works
- [ ] User appears in MongoDB
- [ ] Login works with correct credentials
- [ ] JWT token stored in localStorage
- [ ] Error handling shows meaningful messages

---

## 🎉 You're All Set!

Your **Mindvia Full Stack Application** is ready for:

- ✅ Development
- ✅ Testing
- ✅ Deployment

**Start Server:**

```bash
cd backend
npm start
```

**Open Frontend:**

```
http://localhost:8000/frontend/index.html
```

---

**Happy Coding! 🚀**

Made with ❤️ by Prakash
