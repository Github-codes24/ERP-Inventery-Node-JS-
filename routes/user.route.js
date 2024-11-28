// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);
// POST endpoint to add a user
router.post('/createUser', userController.createUser);

// Login endpoint
router.post('/login', userController.loginUser);

// Forgot password endpoint
router.post('/forgot-password', userController.forgotPassword);

//verify otp
router.post('/verify-otp', userController.verifyOtp);

// Reset password endpoint
router.post('/reset-password', userController.resetPassword);


module.exports = router;
