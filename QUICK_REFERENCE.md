# ⚡ Mindvia Quick Reference Card

## 🚀 Start in 3 Steps

```bash
# 1. Navigate to backend
cd backend

# 2. Start server
npm start

# 3. Open browser
open frontend/index.html
```

---

## 📁 Important Files

| File                     | What to Edit           |
| ------------------------ | ---------------------- |
| `backend/.env`           | MongoDB URI + secrets  |
| `backend/server.js`      | Backend routes & logic |
| `backend/models/User.js` | User schema            |
| `frontend/index.html`    | Home page content      |
| `frontend/register.html` | Registration form      |
| `frontend/login.html`    | Login form             |
| `frontend/style.css`     | Styling & colors       |
| `frontend/script.js`     | Frontend logic         |

---

## 🔐 Authentication Flow

```
User Registration:
[Frontend] → Register Form → [Backend] → Hash Password → [MongoDB]
   ↓                                          ↓
Success Message ← Response JSON ← Save User

User Login:
[Frontend] → Login Form → [Backend] → Verify Password → [MongoDB]
   ↓                                        ↓
JWT Token + Redirect ← Response JSON ← Generate Token
```

---

## 📡 API Endpoints

```
POST /api/auth/register
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

---

## 🛠️ Common Commands

```bash
# Install all dependencies
npm install

# Start backend
npm start

# Start with auto-reload
npm run dev

# Kill port 5000 process
lsof -ti:5000 | xargs kill -9

# Check MongoDB connection
mongosh "mongodb+srv://mindviaUser:Mindvia%40123@cluster0.xxxxx.mongodb.net/mindviaDB"
```

---

## 📊 Database

**Database:** `mindviaDB`
**Collection:** `users`
**Fields:** `_id`, `name`, `email`, `password` (hashed), `createdAt`, `updatedAt`

---

## 🔍 Testing Checklist

- [ ] Backend starts without errors
- [ ] MongoDB shows "✅ Connected"
- [ ] Frontend opens in browser
- [ ] Register form works
- [ ] User appears in MongoDB
- [ ] Login works
- [ ] JWT token stored
- [ ] Success messages show

---

## ⚙️ .env Template

```env
PORT=5000
MONGO_URI=mongodb+srv://mindviaUser:Mindvia%40123@cluster0.xxxxx.mongodb.net/mindviaDB
JWT_SECRET=mindvia_secret_key_2026
NODE_ENV=development
```

---

## 🆘 Emergency Fixes

**Port in use?**

```bash
lsof -ti:5000 | xargs kill -9
```

**MongoDB not connecting?**

- Check .env MONGO_URI
- Verify IP whitelist in MongoDB Atlas
- Confirm credentials

**CORS error?**

- Start backend: `npm start`
- Check API URL in script.js

**Clear cache?**

```
Ctrl+Shift+Delete → Clear cache → Hard refresh F5
```

---

## 📚 File Purposes

- **server.js** - Main app with routes
- **User.js** - Database schema
- **script.js** - API calls & forms
- **style.css** - All styling
- **.env** - Secret configuration
- **index.html** - Home page
- **register.html** - Signup form
- **login.html** - Login form

---

## 🎨 Default Credentials (For Testing)

```
Name: Test User
Email: test@example.com
Password: test123456
```

---

## 📞 Need Help?

1. Check **README.md** - Full documentation
2. Check **SETUP_GUIDE.md** - Step-by-step guide
3. Check **PROJECT_SUMMARY.md** - Complete overview
4. Check console (F12) - Error messages
5. Check MongoDB Atlas - Database status

---

## ✨ Features Implemented

✅ User Registration
✅ User Login
✅ Password Hashing
✅ JWT Authentication
✅ Form Validation
✅ Error Handling
✅ Responsive Design
✅ MongoDB Integration
✅ CORS Support
✅ Environment Variables

---

## 🚀 Ready to Deploy?

1. Push to GitHub
2. Deploy backend to Heroku/Render
3. Deploy frontend to Vercel/Netlify
4. Update API URL in script.js
5. Test in production

---

**Created:** January 31, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
