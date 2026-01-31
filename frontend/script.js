const API = "http://localhost:5000/api/auth";

// Register Function
async function register() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  if (!name.value || !email.value || !password.value) {
    showMessage("❌ All fields are required", "error", messageDiv);
    return;
  }

  if (password.value.length < 6) {
    showMessage("❌ Password must be at least 6 characters", "error", messageDiv);
    return;
  }

  try {
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage("✅ " + data.message, "success", messageDiv);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
      document.getElementById("registerForm").reset();
    } else {
      showMessage("❌ " + data.message, "error", messageDiv);
    }
  } catch (error) {
    showMessage("❌ Registration Error: " + error.message, "error", messageDiv);
  }
}

// Login Function
async function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  if (!email.value || !password.value) {
    showMessage("❌ All fields are required", "error", messageDiv);
    return;
  }

  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage("✅ " + data.message, "success", messageDiv);
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      showMessage("❌ " + data.message, "error", messageDiv);
    }
  } catch (error) {
    showMessage("❌ Login Error: " + error.message, "error", messageDiv);
  }
}

// Show Message Function
function showMessage(message, type, element) {
  element.textContent = message;
  element.className = "message " + type;
  setTimeout(() => {
    element.className = "message";
  }, 5000);
}

// Check if user is logged in on page load
window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    const userData = JSON.parse(user);
    console.log("✅ Logged in as:", userData.name);
  }
});

// Logout Function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
