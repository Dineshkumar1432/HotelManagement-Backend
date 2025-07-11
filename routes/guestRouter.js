// routes/guestRouter.js
const express = require('express');
const router = express.Router();
const connectDB = require('../database/db');
const { resturantmenu } = require('../controllers/resturantController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Get all guest details
router.get('/GuestDetails', async (req, res) => {
    try {
        const db = await connectDB();
        const query = `SELECT * FROM guests`;
        const guestDetails = await db.all(query);
        res.json(guestDetails);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get guest by ID
router.get('/GuestDetails/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const query = `SELECT * FROM guests WHERE id = ?`;
        const guest = await db.get(query, [req.params.id]);

        if (guest) {
            res.json(guest);
        } else {
            res.status(404).send({ message: 'Guest not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/restaurant/menu', resturantmenu);
router.post('/complaint/create', authenticateToken, authorizeRole('guest'), async (req, res) => {
    const db = await connectDB();
    const { roomId, type, priority, description } = req.body;
    //const roomNumber = await db.get(`select roomNumber from rooms where id = ?`, [roomId]);

    try {
        const query = `INSERT INTO complaintsRequests (roomId, type, priority, description) VALUES (?, ?, ?, ?)`;
        const result = await db.run(query, [roomId, type, priority, description]);
        res.status(201).send({ message: 'Complaint created successfully', result: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
