// userController.js
import UserModel from "../models/userModel.js";

/**
 * @swagger
 * /api/allusers/getAllUsers:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - firstName
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *       example:
 *         name: Leanne Graham
 *         firstName: Bret
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
