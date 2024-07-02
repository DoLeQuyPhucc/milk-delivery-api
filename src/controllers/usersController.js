/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         avartaImage:
 *           type: string
 *           description: The user's avatar image.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         role:
 *           type: string
 *           description: The user's role.
 *         password:
 *           type: string
 *           description: The user's password.
 *         address:
 *           type: string
 *           description: The user's address.
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         avartaImage: "https://example.com/avatar.jpg"
 *         email: johndoe@example.com
 *         phoneNumber: "123-456-7890"
 *         role: admin
 *         password: "password123"
 *         address: "123 Main St, Anytown, USA"
 */

/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/users/me:
 *  get:
 *    summary: Get the current user
 *    tags: [Users]
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

/**
 * @swagger
 * /api/users/getUserById/{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/users/getUserByFirstName:
 *   get:
 *     summary: get for a user by first name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         required: true
 *         description: The first name of the user
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    avartaImage,
    email,
    phoneNumber,
    role,
    password,
    address,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    avartaImage,
    email,
    phoneNumber,
    role,
    password,
    address,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  const { id } = req.user; 

  try {
    const user = await UserModel.findById(id);
    console.log(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No user with that id" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...user, id },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No user with that id" });
  }

  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByFirstName = async (req, res) => {
  const { firstName } = req.query;

  try {
    const users = await UserModel.find({
      firstName: { $regex: firstName, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Chỉnh sửa thông tin người dùng
export const editUser = async (req, res) => {
  const { userId } = req.user;
  const { email, password, phoneNumber, firstName, lastName } = req.body;

  try {
    const user = await UserModel.findById(userId);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    res.json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ message: "Server error" });
  }
};
