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
 *         email:
 *           type: string
 *           description: The user's email.
 *         username:
 *           type: string
 *           description: The user's username.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *       example:
 *         _id: 1234567890abcdef
 *         email: example@example.com
 *         username: example_user
 *         createdAt: 2024-06-09T12:00:00.000Z
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
 *           email: example@example.com
 *           username: example_user
 *           createdAt: 2024-06-09T12:00:00.000Z
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

import User from "../models/authModel.js";
import jwt from "jsonwebtoken";

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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully refreshed the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The new JWT token for authentication.
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *       '500':
 *         description: Server error
 */
// Sign In function
// authController.js
import UserModel from "../models/userModel.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const signOut = (req, res) => {
  res.json({ message: "Signed out successfully" });
};

const refreshToken = (req, res) => {
  const { userId, role } = req.user;
  const newToken = jwt.sign({ userId, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token: newToken });
};

export default { signIn, signOut, refreshToken };
