import ProductModel from "../models/productModel.js";

/**
 * @swagger
 * /api/products/getAllProducts:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products. Can be used to populate a list of products when prototyping or testing an API.
 *     responses:
 *       200:
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
 *         - productID
 *         - brandID
 *         - name
 *         - price
 *         - stockQuantity
 *       properties:
 *         productID:
 *           type: number
 *           description: The product's ID.
 *         brandID:
 *           type: number
 *           description: The brand's ID.
 *         name:
 *           type: string
 *           description: The product's name.
 *         productImage:
 *           type: string
 *           description: The product's image URL.
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
 *         productID: 1
 *         brandID: 1
 *         name: Vinamilk Fresh Milk
 *         productImage: "http://example.com/image.jpg"
 *         description: "Fresh milk from Vinamilk."
 *         price: 30000
 *         stockQuantity: 100
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
