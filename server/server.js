require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const eventRoutes = require('./routes/eventRoutes');
const paymentRoutes = require("./routes/paymentRoutes.js");
const participantRoutes = require("./routes/participantRoute.js");
const ticketRoutes = require('./routes/ticketRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// 1. DEFINE MIDDLEWARE (MUST BE FIRST)
app.use(express.json());

const corsOptions = {
  origin: [ `http://localhost:${process.env.FRONTEND_PORT}`,  'https://dicipl-alpha-build.netlify.app'], // Local Host URL // Your Netlify URL
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

// 2. CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// 3. DEFINE ROUTES
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/events', eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

// 4. START THE SERVER (ONLY ONCE, AT THE END)
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
});