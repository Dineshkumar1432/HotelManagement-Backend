const express = require('express');
const app = express();
const PORT = 3000;

// Routers
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRouter');
const staffRoutes = require('./routes/staffRouter');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/staff', staffRoutes);

app.listen(PORT, () => {
    console.log(`Hotel Management API running on port ${PORT}`);
});
