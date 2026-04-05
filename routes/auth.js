const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { adminOnly } = require("../middleware/auth");

// Cookie options
const cookieOptions = {
  httpOnly: true, // JavaScript se access nahi hoga — XSS safe
  secure: process.env.NODE_ENV === "production", // Production mein sirf HTTPS
  sameSite: "strict", // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
};

// Login
router.post("/login", async (req, res) => {

  console.log("lohin huva h ")
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // const user = await User.findOne({ email });
    // if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      console.log('match nhi huva data')
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: process.env.ADMIN_ID },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
console.log("token bn gya hai")
    // Token ab cookie mein save ho raha hai — JSON mein nahi
    res.cookie("lbs_token", token, cookieOptions);

    res.status(200).json({
      message: "login successful",
      user: {
        id: process.env.ADMIN_ID,
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout — cookie clear karo
router.post("/logout", (req, res) => {
  res.clearCookie("lbs_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});

// Get current user
router.get("/me", (req, res) => {
  res.json(req.user);
});

// Change password (admin only)
router.put("/change-password", adminOnly, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Old password incorrect" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
