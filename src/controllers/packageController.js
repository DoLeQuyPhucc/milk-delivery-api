/**
 * @swagger
 * tags:
 *   name: Package
 *   description: API for packages
 */

/**
 * @swagger
 * /api/packages/getAllPackages:
 *   get:
 *     summary: Retrieve a list of packages
 *     description: Retrieve a list of packages, each containing multiple products. Can be used to populate a list of packages for prototyping or testing an API.
 *     tags: [Package]
 *     responses:
 *       '200':
 *         description: A list of packages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           description: List of items in the package.
 *           items:
 *             type: object
 *             required:
 *               - productID
 *               - quantity
 *             properties:
 *               productID:
 *                 type: string
 *                 description: The product's ID.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the package.
 *       example:
 *         items:
 *           - productID: "6667abcfb41ed28189b304c0"
 *             quantity: 3
 *           - productID: "6667abcfb41ed28189b304c4"
 *             quantity: 2
 *           - productID: "6667abcfb41ed28189b304c6"
 *             quantity: 1
 */

import PackageModel from "../models/packageModel.js";

export const getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
