import crypto from "crypto";
import querystring from "qs";
import dovenv from "dotenv";
import moment from "moment-timezone";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import OrderModel from "../models/orderModel.js";
import PackageModel from "../models/packageModel.js";
import UserModel from "../models/userModel.js";
import PaymentModel from "../models/paymentModel.js"; // Import PaymentModel

dovenv.config();
const tmnCode = process.env.TMN_CODE;
const secretKey = process.env.VNP_SECRET_KEY;
const vnpUrl = process.env.VNP_URL;
const returnUrl = process.env.VNP_RETURN_URL;
const returnOrderTrackingUrl = process.env.VNP_RETURN_ORDER_TRACKING_URL;

// Sort object function
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }
  return sorted;
}

export const createPaymentOrder = async (req, res) => {
  try {
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const date = moment().tz("Asia/Ho_Chi_Minh");
    const createDate = date.format("YYYYMMDDHHmmss");
    const orderId = date.format("HHmmss");

    const expireDate = date.add(15, "minutes").format("YYYYMMDDHHmmss");

    const {
      amount,
      bankCode,
      orderDescription: orderInfo,
      orderType,
      language: locale = "vn",
    } = req.body;

    const currCode = "VND";
    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl =
      vnpUrl + "?" + querystring.stringify(vnp_Params, { encode: false });

    console.log("Payment URL generated: ", paymentUrl);

    // Lưu trữ thông tin thanh toán trong cơ sở dữ liệu
    const payment = new PaymentModel({
      orderId,
      vnp_Params,
      orderData: req.body,
      status: "pending",
    });
    await payment.save();

    res.json({ vnpUrl: paymentUrl });
  } catch (error) {
    console.error("Error generating payment URL: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPaymentOrderTracking = async (req, res) => {
  try {
    const { item } = req.body

    if(item.isPaid === true) {
      return res.status(404).json({ message: "Order Tracking has been paid !!!" });
    }

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const date = moment().tz("Asia/Ho_Chi_Minh");
    const createDate = date.format("YYYYMMDDHHmmss");
    const orderId = date.format("HHmmss");

    const expireDate = date.add(15, "minutes").format("YYYYMMDDHHmmss");

    const {
      amount,
      bankCode,
      orderDescription: orderInfo,
      orderType,
      language: locale = "vn",
    } = req.body;

    const currCode = "VND";
    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnOrderTrackingUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl =
      vnpUrl + "?" + querystring.stringify(vnp_Params, { encode: false });

    console.log("Payment URL generated: ", paymentUrl);

    // Lưu trữ thông tin thanh toán trong cơ sở dữ liệu
    const payment = new PaymentModel({
      orderId,
      vnp_Params,
      orderData: req.body,
      status: "pending",
    });
    await payment.save();

    res.json({ vnpUrl: paymentUrl });
  } catch (error) {
    console.error("Error generating payment URL: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      // Tìm thông tin thanh toán trong cơ sở dữ liệu
      const payment = await PaymentModel.findOne({
        orderId: vnp_Params.vnp_TxnRef,
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      const { orderData } = payment;

      if (vnp_Params["vnp_ResponseCode"] === "00") {
        try {
          const {
            packageID,
            shippingAddress,
            paymentMethod,
            userID,
            isPaid,
            paidAt,
            deliveredAt,
            numberOfShipment,
          } = orderData;

          if (!mongoose.Types.ObjectId.isValid(packageID)) {
            return res.status(404).json({ message: "No package with that id" });
          }

          if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(404).json({ message: "No user with that id" });
          }

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
                if (deliveryDaysTueThuSat.includes(currentDate.getDay())) {
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

          // Cập nhật trạng thái thanh toán
          payment.status = "completed";
          await payment.save();

          res.redirect(`${process.env.DEEP_LINKING}order-result`);
        } catch (error) {
          console.error("Error creating order: ", error);
          res.status(500).json({ message: "Error creating order" });
        }
      } else {
        payment.status = "failed";
        await payment.save();
        res.status(200).json({ message: "Payment failed" });
      }
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error processing payment return: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const vnpayReturnOrderTracking = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      // Tìm thông tin thanh toán trong cơ sở dữ liệu
      const payment = await PaymentModel.findOne({
        orderId: vnp_Params.vnp_TxnRef,
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      const { orderData } = payment;

      if (vnp_Params["vnp_ResponseCode"] === "00") {
        try {
          const {
            orderId,
            item
          } = orderData;

        const result = await OrderModel.updateOne(
          { _id: orderId, "circleShipment.tracking._id": item._id },
          { $set: { 
            // "circleShipment.tracking.$.status": "Completed" ,
            // "circleShipment.tracking.$.isDelivered": true,
            "circleShipment.tracking.$.isPaid": true,
          } 
        }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send('Order or tracking item not found');
        }

          // Cập nhật trạng thái thanh toán
          payment.status = "completed";
          await payment.save();

          res.redirect(`${process.env.DEEP_LINKING}order-result`);
        } catch (error) {
          console.error("Error creating order: ", error);
          res.status(500).json({ message: "Error creating order" });
        }
      } else {
        payment.status = "failed";
        await payment.save();
        res.status(200).json({ message: "Payment failed" });
      }
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error processing payment return: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};