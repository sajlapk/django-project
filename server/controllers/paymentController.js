const razorpay = require("../config/razorPayClient.js");

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // converts rupees to paise
      currency: "INR",
      receipt: "order_rcptid" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder };
