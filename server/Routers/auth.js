const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const createJWT = require("../utils/auth")
require("dotenv").config();

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    UserModel.findOne({ username: username }).then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "username already exists" }] });
      } else {
        const user = new UserModel({
          username: username,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({ errors: [{ error: err }] });
              });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.json({ token, message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Token verification route (protected route example)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization").split(" ")[1]; // Expecting 'Bearer [token]'
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = router;
