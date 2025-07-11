const getAllRooms = async (req, res, db) => {
    const { status, type, floor } = req.query;
    let query = 'SELECT Rooms.*, RoomTypes.Category FROM Rooms JOIN RoomTypes ON Rooms.RoomTypeID = RoomTypes.RoomTypeID WHERE 1=1';
    const params = [];

    if (status) {
        query += ' AND Status = ?';
        params.push(status);
    }
    if (type) {
        query += ' AND RoomTypes.Category = ?';
        params.push(type);
    }
    if (floor) {
        query += ' AND Floor = ?';
        params.push(floor);
    }

    try {
        const rooms = await db.all(query, params);
        res.json({ success: true, rooms });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const checkRoomAvailability = async (req, res, db) => {
    const { checkIn, checkOut, roomType } = req.query;

    let query = `SELECT Rooms.* FROM Rooms
               LEFT JOIN Bookings ON Rooms.RoomID = Bookings.RoomID
               WHERE (Bookings.CheckOutDate <= ? OR Bookings.CheckInDate >= ? OR Bookings.RoomID IS NULL)
               AND Rooms.Status = 'available'`;

    const params = [checkIn, checkOut];

    if (roomType) {
        query += ' AND Rooms.RoomTypeID = ?';
        params.push(roomType);
    }

    try {
        const availableRooms = await db.all(query, params);
        res.json({ success: true, availableRooms });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const updateRoomStatus = async (req, res, db) => {
    const { roomId } = req.params;
    const { status } = req.body;

    const query = 'UPDATE Rooms SET Status = ? WHERE RoomID = ?';

    try {
        await db.run(query, [status, roomId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

module.exports = { getAllRooms, checkRoomAvailability, updateRoomStatus };
