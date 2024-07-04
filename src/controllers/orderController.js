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
 *        - isDelivered
 *      properties:
 *        packageID:
 *          type: string
 *          description: ID of the package
 *        shippingAddress:
 *          type: string
 *          description: Shipping address
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
 *        isDelivered:
 *          type: boolean
 *          description: Delivery status
 *        deliveredAt:
 *          type: string
 *          format: date-time
 *          description: Delivery date
 *        circleShipment:
 *          type: string
 *          description: Circle shipment details
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

import mongoose from "mongoose";
import OrderModel from "../models/orderModel.js";
import PackageModel from "../models/packageModel.js";
import UserModel from "../models/userModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
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

export const createOrder = async (req, res) => {
  const {
    packageID,
    shippingAddress,
    paymentMethod,
    userID,
    isPaid,
    paidAt,
    deliveredAt,
    numberOfShipment,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(packageID)) {
    return res.status(404).json({ message: "No package with that id" });
  }

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ message: "No user with that id" });
  }

  try {
    const packages = await PackageModel.findById(packageID);
    if (!packages) {
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
    const deliveryDaysTueThiSat = [2, 4, 6];
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
              deliveredAt: new Date(currentDate),
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
          if (deliveryDaysTueThiSat.includes(currentDate.getDay())) {
            let trackingItem = {
              trackingNumber: currentDeliveryCount,
              isDelivered: false,
              deliveredAt: new Date(currentDate),
              isPaid: isPaid ? true : false,
            };
            circleShipment.tracking.push(trackingItem);
            currentDeliveryCount++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      default:
        break;
    }

    const order = new OrderModel({
      package: packages,
      shippingAddress,
      paymentMethod,
      user: user,
      isPaid,
      paidAt: paidAt ? formatDate(paidAt) : null,
      deliveredAt: formatDate(deliveredAt),
      circleShipment,
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

// export const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, address, phone } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: "No Order with that id" });
//   }

//   try {
//     const updatedOrder = await OrderModel.findByIdAndUpdate(
//       id,
//       { name, email, address, phone, id },
//       { new: true }
//     );
//     res.status(200).json({ message: "Order updated successfully" });
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };
