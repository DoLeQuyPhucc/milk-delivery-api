/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API for managing orders
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - packageID
 *        - shippingAddress
 *        - paymentMethod
 *        - userID
 *        - isPaid
 *        - deliveredAt
 *        - numberOfShipment
 *        - status
 *      properties:
 *        packageID:
 *          type: string
 *          description: ID of the package
 *        shippingAddress:
 *          type: object
 *          description: Shipping address
 *          properties:
 *            fullName:
 *              type: string
 *            phone:
 *              type: string
 *            address:
 *              type: string
 *            city:
 *              type: string
 *            country:
 *              type: string
 *        paymentMethod:
 *          type: string
 *          description: Payment method
 *        userID:
 *          type: string
 *          description: ID of the user
 *        isPaid:
 *          type: boolean
 *          description: Payment status
 *        paidAt:
 *          type: string
 *          format: date-time
 *          description: Payment date
 *        deliveredAt:
 *          type: string
 *          format: date-time
 *          description: Delivery date
 *        circleShipment:
 *          type: object
 *          description: Circle shipment details
 *          properties:
 *            numberOfShipment:
 *              type: integer
 *            tracking:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  trackingNumber:
 *                    type: string
 *                  isDelivered:
 *                    type: boolean
 *                  deliveredAt:
 *                    type: string
 *                  isPaid:
 *                    type: boolean
 *        status:
 *          type: string
 *          enum: [Pending, Out for Delivery, Delivered, On Hold, Cancelled]
 *          description: Order status
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       description: Order details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - packageID
 *               - shippingAddress
 *               - paymentMethod
 *               - userID
 *               - isPaid
 *               - numberOfShipment
 *             properties:
 *               packageID:
 *                 type: string
 *                 description: The ID of the package being ordered
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - fullName
 *                   - phone
 *                   - address
 *                   - city
 *                   - country
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method for the order
 *               userID:
 *                 type: string
 *                 description: The ID of the user placing the order
 *               isPaid:
 *                 type: boolean
 *                 description: Payment status of the order
 *               paidAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when the order was paid
 *               deliveredAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when the order is expected to be delivered
 *               numberOfShipment:
 *                 type: number
 *                 description: Number of shipments in the order
 *               status:
 *                 type: string
 *                 description: Status of the order
 *     responses:
 *       200:
 *         description: Order created successfully. Please confirm your order via email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created successfully. Please confirm your order via email.
 *                 newOrder:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
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
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/getOrders/paged:
 *   get:
 *     summary: Get paginated list of all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *     responses:
 *       200:
 *         description: A paginated list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders/getOrders/filtered:
 *   get:
 *     summary: Get filtered list of orders with pagination
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["Pending", "Out for Delivery", "Delivered", "Cancelled"]
 *         description: Filter by order status
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *         description: Filter by payment method
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: A filtered list of orders with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       description: Order status to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Out for Delivery, Delivered, On Hold, Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/confirmEmail/confirm:
 *   get:
 *     summary: Confirm an order
 *     description: Confirm an order using a confirmation token
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: token
 *         description: Confirmation token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order confirmed successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Order confirmed successfully"
 *       404:
 *         description: Invalid or expired confirmation token
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid or expired confirmation token"
 *       500:
 *         description: Server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Server error"
 */

/**
 * @swagger
 * /api/orders/assignShipper:
 *   post:
 *     summary: Assign a shipper to multiple tracking items across multiple orders
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of order IDs
 *                 example: ["60c72b1f9b1d4c3a6cddf80b", "60c72b1f9b1d4c3a6cddf80c"]
 *               shipperId:
 *                 type: string
 *                 description: The ID of the shipper
 *                 example: "60c72b2f9b1d4c3a6cddf80c"
 *               itemIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tracking item IDs
 *                 example: ["60c72b1f9b1d4c3a6cddf80b", "60c72b1f9b1d4c3a6cddf80c"]
 *     responses:
 *       200:
 *         description: Shipper assigned to tracking items successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shipper assigned to tracking items successfully"
 *                 updates:
 *                   type: integer
 *                   description: Number of updates performed
 *       400:
 *         description: Invalid order, shipper, or item IDs, or items already assigned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid order IDs or shipper ID provided."
 *                 trackingItemsAlreadyAssigned:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       trackingNumber:
 *                         type: string
 *                       shipper:
 *                         type: string
 *       404:
 *         description: One or more orders not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "One or more orders or shipper not found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred on the server."
 */


/**
 * @swagger
 * /api/orders/getOrder/total-delivered:
 *   get:
 *     summary: Get the total number of delivered orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total number of delivered orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDeliveredOrders:
 *                   type: integer
 *                   example: 25
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred on the server.
 */

/**
 * @swagger
 * /api/orders/getOrder/total-cancelled:
 *   get:
 *     summary: Get the total number of cancelled orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total number of cancelled orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCancelledOrders:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred on the server.
 */

/**
 * @swagger
 * /api/orders/getOrder/total-in-month/{year}/{month}:
 *   get:
 *     summary: Get the total number of orders in a specified month
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: The year of the orders
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           example: 7
 *         description: The month of the orders (1-12)
 *     responses:
 *       200:
 *         description: Total number of orders in the specified month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrdersInMonth:
 *                   type: integer
 *                   example: 100
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred on the server.
 */

/**
 * @swagger
 * /api/orders/getOrder/total-user-orders:
 *   get:
 *     summary: Get the total number of user orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total number of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUserOrders:
 *                   type: number
 *                   example: 100
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred on the server."
 */

/**
 * @swagger
 * /api/orders/getOrder/total-price-of-all-orders:
 *   get:
 *     summary: Get the total price of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total price of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPriceOfAllOrders:
 *                   type: number
 *                   example: 50000
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred on the server."
 */



import mongoose from "mongoose";
import { validationResult } from "express-validator";
import OrderModel from "../models/orderModel.js";
import PackageModel from "../models/packageModel.js";
import UserModel from "../models/userModel.js";
import BrandModel from "../models/brandModel.js";
import ShipperModel from "../models/shipperModel.js";
import crypto from "crypto";
import { sendOrderConfirmationEmail } from "../utils/emailUtils.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const orders = await OrderModel.find({ user: userId }).populate({
      path: "package.products.product.brandID",
      model: BrandModel,
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderItemById = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const order = await OrderModel.findById(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    const tracking = order.circleShipment.tracking.find(
      (t) => t._id.toString() === itemId
    );

    if (!tracking) {
      res.status(404).json({ message: "Item not found in the order" });
    }

    const orderDetail = {
      orderId,
      package: order.package,
      shippingAddress: order.shippingAddress,
      item: tracking,
    };

    if (tracking) {
      res.status(200).json(orderDetail);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    packageID,
    shippingAddress,
    paymentMethod,
    userID,
    isPaid,
    paidAt,
    deliveredAt,
    numberOfShipment,
    status,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(packageID)) {
    return res.status(404).json({ message: 'No package with that id' });
  }

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ message: 'No user with that id' });
  }

  try {
    const pkg = await PackageModel.findById(packageID);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const circleShipment = {
      numberOfShipment,
      tracking: [],
    };

    const deliveryDaysMonWedFri = [1, 3, 5];
    const deliveryDaysTueThuSat = [2, 4, 6];
    let currentDeliveryCount = 0;
    let currentDate = new Date(deliveredAt);

    switch (currentDate.getDay()) {
      case 1:
      case 3:
      case 5:
        while (currentDeliveryCount < numberOfShipment) {
          if (deliveryDaysMonWedFri.includes(currentDate.getDay())) {
            let trackingItem = {
              trackingNumber: currentDeliveryCount,
              isDelivered: false,
              deliveredAt: formatDate(new Date(currentDate)),
              isPaid: isPaid ? true : false,
              price: isPaid ? 0 : (pkg.totalPriceDiscount / numberOfShipment),
            };
            circleShipment.tracking.push(trackingItem);
            currentDeliveryCount++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      case 2:
      case 4:
      case 6:
        while (currentDeliveryCount < numberOfShipment) {
          if (deliveryDaysTueThuSat.includes(currentDate.getDay())) {
            let trackingItem = {
              trackingNumber: currentDeliveryCount,
              isDelivered: false,
              deliveredAt: formatDate(new Date(currentDate)),
              isPaid: isPaid ? true : false,
              price: isPaid ? 0 : (pkg.totalPriceDiscount / numberOfShipment),
            };
            circleShipment.tracking.push(trackingItem);
            currentDeliveryCount++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      default:
        return res.status(400).json({ message: 'Cannot choose Sunday for Start date' });
    }

    // Generate a confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const order = new OrderModel({
      package: pkg,
      shippingAddress,
      paymentMethod,
      user: user,
      isPaid,
      paidAt: paidAt ? formatDate(paidAt) : null,
      deliveredAt: formatDate(deliveredAt),
      circleShipment,
      status: status || 'Pending',
      confirmationToken,
    });

    const newOrder = await order.save();

    // Send confirmation email
    sendOrderConfirmationEmail(user.email, confirmationToken);

    res.status(200).json({
      message: 'Order created successfully. Please confirm your order via email.',
      newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const order = await OrderModel.findOne({ confirmationToken: token });

    if (!order) {
      return res.status(404).json({ message: "Order not found or token is invalid" });
    }

    order.isPaid = true;
    order.isConfirmed = true;
    order.confirmationToken = undefined; 
    await order.save();

    res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No Order with that id" });
  }

  try {
    await OrderModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListOrderByDate = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ error: "Date query parameter is required" });
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const targetDate = formatDate(new Date(date));
  console.log(targetDate);
  try {
    const orders = await OrderModel.find({
      "circleShipment.tracking.deliveredAt": targetDate,
    }).lean();

    const filteredOrders = orders
      .map((order) => {
        const packageDetails = order.package;

        const { shippingAddress, circleShipment } = order;

        const relevantTrackings = circleShipment.tracking.filter(
          (tracking) =>
            tracking.deliveredAt === targetDate &&
            (tracking.status === "Pending" || tracking.status === "Out for Delivery")
        );

        return relevantTrackings.map((tracking) => ({
          _id: order._id,
          package: packageDetails,
          shippingAddress,
          order: tracking,
        }));
      })
      .flat();

    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No Order with that id" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderTrackingStatus = async (req, res) => {
  const { orderId, itemId } = req.params;
  const { status, reason } = req.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({ message: "No Order with that id" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    if (status === "Completed") {
      const result = await OrderModel.updateOne(
        { _id: orderId, "circleShipment.tracking._id": itemId },
        {
          $set: {
            "circleShipment.tracking.$.status": status,
            "circleShipment.tracking.$.isDelivered": true,
            "circleShipment.tracking.$.reason": reason,
          },
        }
      );
      res
        .status(200)
        .json({ message: "Order status updated successfully", result });
    } else {
      const result = await OrderModel.updateOne(
        { _id: orderId, "circleShipment.tracking._id": itemId },
        {
          $set: {
            "circleShipment.tracking.$.status": status,
            "circleShipment.tracking.$.isDelivered": false,
            "circleShipment.tracking.$.reason": reason,
          },
        }
      );
      res
        .status(200)
        .json({ message: "Order status updated successfully", result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersPaged = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalDocuments = await OrderModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const orders = await OrderModel.find().skip(skip).limit(limit);

    res.status(200).json({
      totalPages,
      currentPage: page,
      limit,
      totalDocuments,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilteredOrders = async (req, res) => {
  try {
    const {
      page = 1,
      size = 10,
      status,
      user,
      paymentMethod,
      startDate,
      endDate,
    } = req.query;
    let query = {};

    if (status) query.status = status;
    if (user) query.user = user;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const skip = (page - 1) * size;

    const orders = await OrderModel.find(query).skip(skip).limit(size);

    const total = await OrderModel.countDocuments(query);

    res.status(200).json({
      data: orders,
      totalPages: Math.ceil(total / size),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    if (!brandId) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    // Query for orders that have at least one product from the specified brand
    const orders = await OrderModel.find({
      "package.products.product.brandID": brandId,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeliveryDateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { trackingId, newDeliveredAt } = req.body;

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    const tracking = order.circleShipment.tracking.id(trackingId);
    if (!tracking) {
      return res.status(404).send({ message: "Tracking not found" });
    }

    tracking.deliveredAt = newDeliveredAt;
    tracking.status = "Pending";
    order.updateStatus();

    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    order.status = "Cancelled";
    order.circleShipment.tracking.forEach((tracking) => {
      tracking.status = "Cancelled";
    });

    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updates = req.body;

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    Object.keys(updates).forEach((updateKey) => {
      order[updateKey] = updates[updateKey];
    });

    if (updates.shouldUpdateStatus) {
      order.updateStatus();
    }

    await order.save();

    res.send(order);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating order", error: error.toString() });
  }
};

// Function to update circle shipment details of an order
export const updateCircleShipmentOrder = async (req, res) => {
  const { orderId } = req.params;
  const {
    trackingNumber,
    isDelivered,
    deliveredAt,
    status,
    isPaid,
    reason,
    newDate,
  } = req.body;

  try {
    // Find the order by ID
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the tracking item by its tracking number
    const shipmentIndex = order.circleShipment.tracking.findIndex(
      (shipment) => shipment.trackingNumber === trackingNumber
    );

    if (shipmentIndex === -1) {
      return res.status(404).json({ message: "Tracking number not found" });
    }

    // Update the tracking information
    if (isDelivered !== undefined)
      order.circleShipment.tracking[shipmentIndex].isDelivered = isDelivered;
    if (deliveredAt !== undefined)
      order.circleShipment.tracking[shipmentIndex].deliveredAt = deliveredAt;
    if (status !== undefined)
      order.circleShipment.tracking[shipmentIndex].status = status;
    if (isPaid !== undefined)
      order.circleShipment.tracking[shipmentIndex].isPaid = isPaid;
    if (reason !== undefined)
      order.circleShipment.tracking[shipmentIndex].reason = reason;
    if (newDate !== undefined)
      order.circleShipment.tracking[shipmentIndex].newDate = newDate;

    // Update the order status based on the new shipment details
    order.updateStatus();

    // Save the updated order
    await order.save();

    res
      .status(200)
      .json({ message: "Shipment details updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const assignShipperToOrder = async (req, res) => {
  const { orderIds, shipperId, itemIds } = req.body;

  // Validate shipperId
  if (!mongoose.Types.ObjectId.isValid(shipperId)) {
    return res.status(400).json({ message: "Invalid shipper ID" });
  }

  // Validate each orderId and itemId
  if (!orderIds.every((orderId) => mongoose.Types.ObjectId.isValid(orderId))) {
    return res.status(400).json({ message: "One or more invalid order IDs" });
  }

  if (!itemIds.every((itemId) => mongoose.Types.ObjectId.isValid(itemId))) {
    return res.status(400).json({ message: "One or more invalid item IDs" });
  }

  try {
    // Retrieve all orders to check the shipperId in the tracking items
    const orders = await OrderModel.find({ _id: { $in: orderIds } });
    if (orders.length !== orderIds.length) {
      return res.status(404).json({ message: "One or more orders not found" });
    }

    // Prepare updates for tracking items
    const updates = [];
    const trackingItemsAlreadyAssigned = [];

    orders.forEach((order) => {
      const trackingItemsToUpdate = order.circleShipment.tracking.filter(
        (item) =>
          itemIds.includes(item._id.toString()) &&
          item.status === "Pending" &&
          !item.shipper
      );

      trackingItemsToUpdate.forEach((item) => {
        updates.push(
          OrderModel.updateOne(
            { _id: order._id, "circleShipment.tracking._id": item._id },
            { $set: { "circleShipment.tracking.$.shipper": shipperId } }
          )
        );
      });

      const alreadyAssignedItems = order.circleShipment.tracking.filter(
        (item) => itemIds.includes(item._id.toString()) && item.shipper
      );

      if (alreadyAssignedItems.length > 0) {
        trackingItemsAlreadyAssigned.push(...alreadyAssignedItems);
      }
    });

    // If all items are already assigned, return an error
    if (trackingItemsAlreadyAssigned.length > 0) {
      return res.status(400).json({
        message: "One or more tracking items already have a shipper assigned",
        trackingItemsAlreadyAssigned,
      });
    }

    // Proceed to update all tracking items with the new shipperId
    await Promise.all(updates);

    res.status(200).json({
      message: "Shipper assigned to tracking items successfully",
      updates: updates.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get the total number of delivered orders
export const getTotalDeliveredOrders = async (req, res) => {
  try {
    const totalDeliveredOrders = await OrderModel.countDocuments({ status: 'Delivered' });
    res.status(200).json({ totalDeliveredOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get the total number of cancelled orders
export const getTotalCancelledOrders = async (req, res) => {
  try {
    const totalCancelledOrders = await OrderModel.countDocuments({ status: 'Cancelled' });
    res.status(200).json({ totalCancelledOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get the total number of orders in a specified month
export const getTotalOrdersInMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const totalOrdersInMonth = await OrderModel.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json({ totalOrdersInMonth });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Total user orders
export const getTotalUserOrders = async (req, res) => {
  try {
    const totalUserOrders = await OrderModel.countDocuments();
    res.status(200).json({ totalUserOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Total price of all tracking items in all orders
export const getTotalPriceOfAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    const totalPriceOfAllOrders = orders.reduce((sum, order) => {
      const trackingTotal = order.circleShipment.tracking.reduce((trackingSum, trackingItem) => trackingSum + (trackingItem.price || 0), 0);
      return sum + trackingTotal;
    }, 0);
    res.status(200).json({ totalPriceOfAllOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};