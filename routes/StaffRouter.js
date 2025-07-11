const express = require('express');
const router = express.Router();
const connectDB = require('../database/db');

router.get('/StaffDetails', async (req, res) => {
    const db = await connectDB();
    // Fetch staff details from the database
    const staffDetails = await db.all('SELECT * FROM staff');
    res.send(staffDetails);
});

router.get('/StaffDetails/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        // Use parameterized query to prevent SQL injection
        const staff = await db.get(`SELECT * FROM staff WHERE employeeID = ?`, [id]);

        if (staff) {
            res.json(staff);
        } else {
            res.status(404).send({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;
