import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js";
const client = new OAuth2Client(
  "1080348899893-b1ek0t1uk5psnlvft04q6h8btduccuqs.apps.googleusercontent.com"
);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         role:
 *           type: string
 *           description: The user's role.
 *         shipper:
 *           type: string
 *           description: The shipper ID associated with the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *       example:
 *         _id: 1234567890abcdef
 *         firstName: John
 *         lastName: Doe
 *         email: example@example.com
 *         phoneNumber: '123456789'
 *         role: SHIPPER
 *         shipper: 1234567890abcdef
 *         createdAt: 2024-06-09T12:00:00.000Z
 *     Shipper:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The shipper ID.
 *         shipperName:
 *           type: string
 *           description: The shipper's name.
 *         phone:
 *           type: string
 *           description: The shipper's phone number.
 *         store:
 *           type: object
 *           properties:
 *             storeID:
 *               type: string
 *               description: The store ID associated with the shipper.
 *       example:
 *         _id: 1234567890abcdef
 *         shipperName: John Doe Shipper
 *         phone: '123456789'
 *         store:
 *           storeID: 1234567890abcdef
 *     SignInResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: The JWT token for authentication.
 *       example:
 *         user:
 *           _id: 1234567890abcdef
 *           firstName: John
 *           lastName: Doe
 *           email: example@example.com
 *           phoneNumber: '123456789'
 *           role: SHIPPER
 *           shipper: 1234567890abcdef
 *           createdAt: 2024-06-09T12:00:00.000Z
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The JWT token for authentication.
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token.
 *       '400':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */


/**
 * @swagger
 * /api/auth/refreshToken:
 *   post:
 *     summary: Refresh the authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *             example:
 *               refreshToken: "your_refresh_token"
 *     responses:
 *       '200':
 *         description: Successfully refreshed the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new JWT token for authentication.
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message for email verification.
 *       '400':
 *         description: User already exists
 *       '500':
 *         description: Error creating user
 */

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Verify a user's email address
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The email verification token
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message for successful email verification.
 *       '400':
 *         description: Invalid verification token
 *       '500':
 *         description: Server error
 */


/**
 * @swagger
 * /api/auth/me:
 *  get:
 *    summary: Get the current user
 *    tags: [Authentication]
 *    responses:
 *      '200':
 *        description: Successfully retrieved user information.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  example: '507f1f77bcf86cd799439011'
 *                name:
 *                  type: string
 *                  example: 'John Doe'
 *                email:
 *                  type: string
 *                  example: 'john.doe@example.com'
 *      '400':
 *        description: User not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'User not found'
 *      '500':
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Server error'
 */

// Sign In function
// authController.js
import UserModel from "../models/userModel.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/emailUtils.js";

// Sign In function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Refresh Token function
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};

// Sign Up function
const signUp = async (req, res) => {
  const { email, password, phoneNumber, firstName, lastName, address } = req.body;

  try {
    // Check if user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    const user = new UserModel({
      email,
      firstName,
      lastName,
      userName: email,
      phoneNumber,
      address,
      password,
      verificationToken,
      role: "USER",
    });

    // Save user
    await user.save();

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "User created, please verify your email" });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Verify Email function
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getMe = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Google Sign Up function
const googleSignup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, role, googleId } =
    req.body;

  try {
    // Check if user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = password;
    if (!googleId) {
      // Hash password if it's not a Google sign-up
      hashedPassword = await bcrypt.hash(password, 12);
    }

    // Create new user
    user = new UserModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      userName: email,
      password: hashedPassword,
      googleId: googleId || null,
      // Set other fields as necessary
    });

    // Save user
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Respond with token and user details
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Google Login function
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture, given_name, family_name } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        email,
        firstName: given_name || "Unknown",
        lastName: family_name || "User",
        avatarImage: picture,
        userName: email,
        phoneNumber: "N/A",
        role: "USER",
        password: "N/A",
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ user, token: jwtToken });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

// Sign Out function
const signOut = (req, res) => {
  res.json({ message: "Signed out successfully" });
};

export default {
  signIn,
  signOut,
  refreshToken,
  googleLogin,
  googleSignup,
  signUp,
  getMe,
  verifyEmail,
};
