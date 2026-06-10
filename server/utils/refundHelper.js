const razorpay = require("../config/razorPayClient");

const processRefund = async (paymentId, amount) => {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // convert to paise
      speed: "optimum", // can be 'optimum' or 'instant' (instant needs Razorpay approval)
    });
    return refund;
  } catch (error) {
    console.error("Refund error:", error);
    throw new Error("Refund failed: " + error.message);
  }
};

module.exports = { processRefund };
