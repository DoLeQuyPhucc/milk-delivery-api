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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
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
 * /api/orders/assignShipper:
 *   post:
 *     summary: Assign a shipper to an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order
 *               shipperId:
 *                 type: string
 *                 description: The ID of the shipper
 *             example:
 *               orderId: "60c72b1f9b1d4c3a6cddf80b"
 *               shipperId: "60c72b2f9b1d4c3a6cddf80c"
 *     responses:
 *       '200':
 *         description: Shipper assigned to order successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shipper assigned to order successfully"
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid order or shipper ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               invalidId:
 *                 value: { "message": "Invalid order ID or shipper ID provided." }
 *       '404':
 *         description: Order or shipper not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               notFound:
 *                 value: { "message": "Order or shipper not found." }
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               serverError:
 *                 value: { "message": "An unexpected error occurred on the server." }
 */

import mongoose from "mongoose";
import { validationResult } from "express-validator";
import OrderModel from "../models/orderModel.js";
import PackageModel from "../models/packageModel.js";
import UserModel from "../models/userModel.js";
import BrandModel from "../models/brandModel.js";
import ShipperModel from "../models/shipperModel.js";

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

  console.log("req.body: ", req.body);
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
    return res.status(404).json({ message: "No package with that id" });
  }

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ message: "No user with that id" });
  }

  try {
    const pkg = await PackageModel.findById(packageID);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
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
            };
            circleShipment.tracking.push(trackingItem);
            currentDeliveryCount++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      default:
        return res
          .status(400)
          .json({ message: "Cannot choose Sunday for Start date" });
    }

    const order = new OrderModel({
      package: pkg,
      shippingAddress,
      paymentMethod,
      user: user,
      isPaid,
      paidAt: paidAt ? formatDate(paidAt) : null,
      deliveredAt: formatDate(deliveredAt),
      circleShipment,
      status: status || "Pending",
    });

    const newOrder = await order.save();
    res.status(200).json({
      message: "Order created successfully",
      newOrder,
    });
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
          (tracking) => tracking.deliveredAt === targetDate
        );

        console.log(relevantTrackings);

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
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({ message: "No Order with that id" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const result = await OrderModel.updateOne(
      { _id: orderId, "circleShipment.tracking._id": itemId },
      {
        $set: {
          "circleShipment.tracking.$.status": status,
          "circleShipment.tracking.$.isDelivered": true,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Order status updated successfully", result });
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
}

export const updateOrder = async (req, res) => {
  const { orderId } = req.params; // Assuming the order ID is passed as a URL parameter
  const updates = req.body; // Assuming updates are sent in the request body

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
  const { orderId, shipperId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(orderId) ||
    !mongoose.Types.ObjectId.isValid(shipperId)
  ) {
    return res.status(400).json({ message: "Invalid order or shipper ID" });
  }

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shipper = await ShipperModel.findById(shipperId);
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    if (order.shipper) {
      return res
        .status(400)
        .json({ message: "Order already has a shipper assigned" });
    }

    if (order.status !== "Pending" || order.isPaid === false) {
      return res
        .status(400)
        .json({
          message: "Order must be pending and paid to assign a shipper",
        });
    }

    order.shipper = shipperId;
    await order.save();

    res
      .status(200)
      .json({ message: "Shipper assigned to order successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
