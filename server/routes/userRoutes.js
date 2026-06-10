const express = require('express')
const router = express.Router();
const { getUserProfileData } = require("../controllers/userController")

// GET /api/users/profile/:userId
router.get('/profile/:userId', getUserProfileData)

module.exports = router;