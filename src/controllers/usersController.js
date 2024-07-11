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
 *     description: Retrieves all users, sorted by role in the order of ADMIN, MANAGER, SHIPPER, CUSTOMER.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users, sorted by role in the order of ADMIN, MANAGER, SHIPPER, CUSTOMER.
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

/**
 * @swagger
 * /api/users/paged:
 *   get:
 *     summary: Get users by page
 *     tags: [Users]
 *     description: Retrieves users in a paginated format based on the provided page and size parameters.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           description: The page number of the paginated results.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *           description: The number of items to return per page.
 *     responses:
 *       '200':
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalUsers:
 *                   type: integer
 *       '400':
 *         description: Bad request. Parameters provided are incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error.
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
 * /api/users/{id}:
 *   put:
 *     summary: Updates a user by ID
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: No user found with the provided ID
 *       409:
 *         description: Conflict, could not update the user
 */

/**
 * @swagger
 * /api/users/by-email:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     description: Retrieves a user based on the provided email.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Server error.
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
 * /api/users/by-role:
 *   get:
 *     summary: Get users by role
 *     tags: [Users]
 *     description: Retrieves users based on the provided role.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: The role of the users to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Server error.
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
 * /api/users/filtered:
 *    get:
 *     summary: Get filtered list of users
 *     tags: [Users]
 *     description: Retrieve a paginated list of users based on filter criteria such as firstName, lastName, email, phoneNumber, and role.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by the user's first name.
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by the user's last name.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by the user's email address.
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: Filter by the user's phone number.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by the user's role.
 *     responses:
 *       '200':
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */

import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    const roleOrder = ["ADMIN", "MANAGER", "CUSTOMER"];
    users.sort((a, b) => {
      return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
    });

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

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, ...updateData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No user with that id" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
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

export const getUserPaged = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size, 10);
  const skip = (parseInt(page, 10) - 1) * limit;

  try {
    const users = await UserModel.find().limit(limit).skip(skip);
    const totalUsers = await UserModel.countDocuments();

    res.status(200).json({
      users,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserModel.findOne({
      email: { $regex: email, $options: "i" },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByRole = async (req, res) => {
  const { role } = req.query;

  try {
    const users = await UserModel.find({
      role: { $regex: role, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsersFiltered = async (req, res) => {
  try {
    const {
      page = 1,
      size = 10,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
    } = req.query;

    let query = {};
    if (firstName) query.firstName = { $regex: firstName, $options: "i" };
    if (lastName) query.lastName = { $regex: lastName, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (phoneNumber) query.phoneNumber = { $regex: phoneNumber, $options: "i" };
    if (role) query.role = role;

    const skip = (page - 1) * size;

    const users = await UserModel.find(query).skip(skip).limit(size);

    const total = await UserModel.countDocuments(query);

    res.status(200).json({
      data: users,
      totalPages: Math.ceil(total / size),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
