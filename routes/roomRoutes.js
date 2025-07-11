const express = require('express');
const router = express.Router();
const connectDB = require('../database/db');
const { getAllRooms, checkRoomAvailability, updateRoomStatus } = require('../controllers/roomController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Staff 
router.get('/', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    getAllRooms(req, res, db);
});

// Staff 
router.get('/availability', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    checkRoomAvailability(req, res, db);
});

// Staff 
router.put('/:roomId/status', authenticateToken, authorizeRole(['staff']), async (req, res) => {
    const db = await connectDB();
    updateRoomStatus(req, res, db);
});

module.exports = router;
