// If you want to store orders in MongoDB/SQL, use this schema:
import mongoose from "mongoose";

const razorPayOrderSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  currency: String,
  receipt: String,
  status: String,
}, { timestamps: true });

export default mongoose.model("RazorPayOrder", razorPayOrderSchema);
