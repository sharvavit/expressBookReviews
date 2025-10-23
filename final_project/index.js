const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

// Import routers
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize session middleware
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// 🔐 Authentication Middleware for protected routes
app.use("/customer/auth/*", function auth(req, res, next) {
  // Check if session and access token exist
  if (req.session.authorization) {
    const token = req.session.authorization['accessToken'];

    // Verify JWT
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user; // attach verified user info
        next(); // move to next middleware or route
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

// Use customer and general routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Start server
app.listen(PORT, () => console.log("Server is running on port " + PORT));
