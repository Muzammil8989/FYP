const transporter = require("../config/nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

// Send verification email
const sendVerificationEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: user.email, // Recipient address
      subject: "Verify Your Email", // Subject line
      text: `Hello ${user.name}, please click on the following link to verify your email: ${process.env.CLIENT_URL}/verify/${user.verificationToken}. The link is valid for 1 hour.`, // Plain text body
      html: `
      <p>Hello ${user.name},</p>
      <p>Please click <a href="${process.env.CLIENT_URL}/verify/${user.verificationToken}">here</a> to verify your email address and activate your account.</p>
      <p>The link is valid for 1 hour.</p>
    `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Password validation regex
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const tokenExpires = new Date(Date.now() + 3600000); // Token should be valid for 1 hour

    user = new User({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires: tokenExpires,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    await sendVerificationEmail(user);

    res.json({ msg: "User registered. Verification email sent." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Verify email

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }, // Token should be valid (not expired)
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Invalid or expired verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ msg: "Email verified. You can now log in." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login a user
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password does not match" });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: "Please verify your email" });
    }
    let roleAssigned = false;
    if (!user.role) {
      user.role = role;
      await user.save();
      roleAssigned = true;
    } else if (user.role !== role) {
      return res.status(400).json({ msg: "Role does not match" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 24 * 60 * 60 * 24 * 60, // 24 hours
      },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "Login successful", token, roleAssigned });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Send verification email
const sendVerificationPasswordEmail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Verify Your Forget Password", // Corrected subject line
    text: `Hello ${user.name}, please click on the following link to verify your password reset: ${process.env.CLIENT_URL}/reset/${user.resetPasswordToken}`,
    html: `<p>Hello ${user.name},</p><p>Please click <a href="${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}">here</a> to verify your password reset.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Forget Password
const forgetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    await sendVerificationPasswordEmail(user);

    res.json({ msg: "Password reset email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;
  const { resetPasswordToken } = req.params;

  try {
    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid or expired reset password token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgetPassword,
  resetPassword,
};
