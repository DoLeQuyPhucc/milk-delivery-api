/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for products
 */

import ProductModel from "../models/productModel.js";

/**
 * @swagger
 * /api/allproducts/getAllProducts:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products. Can be used to populate a list of fake products when prototyping or testing an API.
 *     tags: [Product]
 *     responses:
 *       '200':

 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - productImage
 *         - description
 *         - price
 *         - stockQuantity
 *       properties:
 *         name:
 *           type: string
 *           description: The product's name.
 *         productImage:
 *           type: string
 *           description: The product's image.
 *         description:
 *           type: string
 *           description: The product's description.
 *         price:
 *           type: number
 *           description: The product's price.
 *         stockQuantity:
 *           type: number
 *           description: The product's stock quantity.
 *       example:
 *         name: Leanne Graham
 *         productImage: https://via.placeholder.com/150/92c952
 *         description: The product's description.
 *         price: 100
 *         stockQuantity: 10
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
