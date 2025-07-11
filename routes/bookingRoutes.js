const express = require('express');
const router = express.Router();
const connectDB = require('../database/db');
const { createBooking, getAllBookings, checkIn, checkOut } = require('../controllers/bookingController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Staff 
router.post('/', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    createBooking(req, res, db);
});

// Staff 
router.get('/', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    getAllBookings(req, res, db);
});

// Staff 
router.put('/:bookingId/checkin', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    checkIn(req, res, db);
});

// Staff 
router.put('/:bookingId/checkout', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    checkOut(req, res, db);
});

module.exports = router;
