const express = require("express");
const { createOrder } = require("../controllers/razorPayController.js");

const router = express.Router();

// POST /api/payments/create-order
router.post("/create-order", createOrder);

module.exports = router;