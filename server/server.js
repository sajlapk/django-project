require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. DEFINE MIDDLEWARE (MUST BE FIRST)
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: 'https://dicipl-alpha-build.netlify.app', // Your Netlify URL
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

// 4. START THE SERVER (ONLY ONCE, AT THE END)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
