const createBooking = async (req, res, db) => {
    const { guestId, roomId, checkInDate, checkOutDate, specialRequests } = req.body;

    const query = `INSERT INTO Bookings (GuestID, RoomID, CheckInDate, CheckOutDate, Status, SpecialRequests, PaymentStatus)
                 VALUES (?, ?, ?, ?, 'upcoming', ?, 'pending')`;

    try {
        const result = await db.run(query, [guestId, roomId, checkInDate, checkOutDate, specialRequests]);
        res.json({ success: true, bookingId: result.lastID });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const getAllBookings = async (req, res, db) => {
    const { status, guestName } = req.query;
    let query = `SELECT Bookings.*, Guests.FirstName || ' ' || Guests.LastName AS GuestName FROM Bookings
               JOIN Guests ON Bookings.GuestID = Guests.GuestID WHERE 1=1`;
    const params = [];

    if (status) {
        query += ' AND Bookings.Status = ?';
        params.push(status);
    }

    if (guestName) {
        query += ' AND GuestName LIKE ?';
        params.push(`%${guestName}%`);
    }

    try {
        const bookings = await db.all(query, params);
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const checkIn = async (req, res, db) => {
    const { bookingId } = req.params;
    const { actualArrivalTime } = req.body;

    const query = 'UPDATE Bookings SET Status = ?, SpecialRequests = ? WHERE BookingID = ?';

    try {
        await db.run(query, ['active', `Checked in at ${actualArrivalTime}`, bookingId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const checkOut = async (req, res, db) => {
    const { bookingId } = req.params;

    const query = 'UPDATE Bookings SET Status = ? WHERE BookingID = ?';

    try {
        await db.run(query, ['completed', bookingId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).send('Database error');
    }
};

module.exports = { createBooking, getAllBookings, checkIn, checkOut };
