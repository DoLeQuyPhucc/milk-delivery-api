import cron from "node-cron";
import PaymentModel from "../models/paymentModel.js";

const schedulePaymentCleanup = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const now = new Date();
      await PaymentModel.deleteMany({
        status: "pending",
      });
      console.log("Expired payments deleted");
    } catch (error) {
      console.error("Error deleting expired payments:", error);
    }
  });
};

export default schedulePaymentCleanup;
