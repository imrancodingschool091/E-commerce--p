import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { Token } from "../model/token.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/genrateToken.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({ name, email, password });

    return res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* 🔐 Generate Tokens */
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    /* 💾 Save Refresh Token */
    await Token.create({
      userId: user._id,
      token: refreshToken,
    });

    /* 🍪 Set Refresh Token Cookie */
    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true, // localhost me false
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= REFRESH ACCESS TOKEN ================= */
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const tokenDoc = await Token.findOne({ token: refreshToken });
    if (!tokenDoc) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = generateAccessToken(decoded.userId);

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;

    if (refreshToken) {
      /* 🗑️ Delete refresh token from DB */
      await Token.deleteOne({ token: refreshToken });
    }

    /* 🍪 Clear Cookie */
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // localhost me false
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
