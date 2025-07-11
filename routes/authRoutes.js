const express = require('express');
const router = express.Router();
const connectDB = require('../database/db');
const { registerStaff, loginStaff, registerGuest, loginGuest } = require('../controllers/authController');

// Staff APIs
router.post('/staff/register', async (req, res) => {
    const db = await connectDB();
    registerStaff(req, res, db);
});

router.post('/staff/login', async (req, res) => {
    const db = await connectDB();
    loginStaff(req, res, db);
});

// Guest APIs
router.post('/guest/register', async (req, res) => {
    const db = await connectDB();
    registerGuest(req, res, db);
});

router.post('/guest/login', async (req, res) => {
    const db = await connectDB();
    loginGuest(req, res, db);
});



module.exports = router;
