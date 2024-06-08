import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/authModel.js"; // Import User model

// Secret key for JWT
const secretKey = "your_secret_key";

// Sign In function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Sign Out function
const signOut = (req, res) => {
  // Simply return a success message as JWT will be discarded client-side
  res.json({ message: "Signed out successfully" });
};

// Export the functions as default
export default { signIn, signOut };
