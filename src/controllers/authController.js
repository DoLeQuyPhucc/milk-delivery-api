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
// Sign In function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log("Received email:", email);

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has a password set
    if (user.googleId) {
      return res.status(400).json({
        message: "You already have an account with this email.",
      });
    }

    // Check if password is correct (plain text comparison)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Exclude the password from the response
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Google Login function
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    console.log("Received token:", token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("Token payload:", payload);

    const { sub, email, name, picture, given_name, family_name } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        email,
        firstName: given_name || "Unknown",
        lastName: family_name || "User",
        avatarImage: picture,
        phoneNumber: "N/A",
        role: "USER",
        password: "N/A",
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ user, token: jwtToken });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

// Sign Out function
const signOut = (req, res) => {
  // Simply return a success message as JWT will be discarded client-side
  res.json({ message: "Signed out successfully" });
};

// Export the functions as default
export default { signIn, signOut, googleLogin };
