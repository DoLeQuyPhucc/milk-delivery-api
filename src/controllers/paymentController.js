import crypto from "crypto";
import querystring from "qs";
import dateFormat from "dateformat";

const tmnCode = "51W409Q6";
const secretKey = "5L95LTE48XCDYRP64PDH2GCEYGA45C95";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:8000/api/payments/vnpay_return";

export const createPayment = (req, res) => {
  try {
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    // Ensure the date is correctly synchronized
    const date = new Date();
    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");

    // Adding ExpireDate parameter to prevent timeout issues
    const expireDate = dateFormat(new Date(date.getTime() + 15 * 60 * 1000), "yyyymmddHHmmss");

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

    res.json({ vnpUrl: paymentUrl });
  } catch (error) {
    console.error("Error generating payment URL: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const vnpayReturn = (req, res) => {
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
      res.json({
        message: "Payment success",
        code: vnp_Params["vnp_ResponseCode"],
        data: req.query,
      });
    } else {
      res.json({ message: "Payment failed", code: "97", data: req.query });
    }
  } catch (error) {
    console.error("Error processing vnpay return: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }
  return sorted;
}
