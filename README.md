Prastice............
# 🧠 Mindvia - Smart Studying Platform

A full-stack web application for smart studying with user registration and login functionality.

## 📁 Project Structure

```
mindvia/
├── backend/
│   ├── server.js           # Main server file
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies
│   ├── models/
│   │   ├── User.js         # User schema
│   │   ├── Course.js       # Course schema
│   │   └── Progress.js     # Progress tracking schema
│   └── routes/
│       └── auth.js         # Authentication routes (optional)
│
├── frontend/
│   ├── index.html          # Home page
│   ├── register.html       # Registration page
│   ├── login.html          # Login page
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
│
└── README.md               # This file
```

## 🚀 Features

✅ User Registration  
✅ User Login  
✅ Password Hashing (bcryptjs)  
✅ JWT Authentication  
✅ MongoDB Database  
✅ Responsive Design  
✅ CORS Enabled  
✅ Error Handling

## 🔧 Backend Setup

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Installation

1. **Navigate to backend folder**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install express mongoose dotenv cors bcryptjs jsonwebtoken
   ```

3. **Configure .env file**

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mindviaDB
   JWT_SECRET=mindvia_secret_key_2026
   NODE_ENV=development
   ```

4. **Replace MongoDB credentials**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Get your connection string
   - Replace in `.env`

5. **Run the server**

   ```bash
   node server.js
   ```

   Expected output:

   ```
   ✅ MongoDB Atlas Connected
   ✅ Server running on http://localhost:5000
   ```

## 🎨 Frontend Setup

The frontend runs directly in the browser. No build process needed!

1. **Open in browser**

   ```bash
   cd frontend
   # Open index.html in your browser
   ```

   Or start a local server:

   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

## 📡 API Endpoints

### Register User

- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login User

- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "✅ Login Successful",
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## 🧪 Testing

1. **Start Backend**

   ```bash
   cd backend
   node server.js
   ```

2. **Open Frontend**
   - Open `frontend/index.html` in your browser
   - Register with test credentials
   - Check MongoDB Atlas for new user

3. **Check Database**
   - Go to MongoDB Atlas
   - Browse Collections
   - See `users` collection with registered users

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT tokens for sessions
- ✅ Email validation
- ✅ Input validation
- ✅ CORS protection
- ✅ Environment variables for secrets

## 📦 Dependencies

**Backend:**

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-Origin Resource Sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

## 🚀 Deployment

To deploy this project:

1. **Backend Deployment** (Heroku, Render, Railway)
   - Set environment variables
   - Push code
   - Start server

2. **Frontend Deployment** (Vercel, Netlify, GitHub Pages)
   - Build or push static files
   - Enable CORS on backend URL

## 📝 Next Steps

- [ ] Password encryption
- [ ] Dashboard page
- [ ] Email verification
- [ ] Forgot password feature
- [ ] User profile management
- [ ] Course management
- [ ] Progress tracking

## 🐛 Troubleshooting

**MongoDB Connection Error?**

- Check `.env` file MONGO_URI
- Verify credentials in MongoDB Atlas
- Ensure IP whitelist is configured

**CORS Error?**

- Ensure backend has `cors` middleware enabled
- Check API endpoint URL in frontend

**Port Already in Use?**

- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

## 👨‍💻 Author

Developed by Prakash

## 📄 License

MIT License

---

**Made with ❤️ for Smart Studying**
