const connectDB = require('../database/db');
const resturantmenu = async (req, res) => {
    const db = await connectDB();
    const query = 'SELECT * FROM MenuItems';

    try {
        const menuItems = await db.all(query);
        res.json({ success: true, menuItems });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}
module.exports = { resturantmenu };