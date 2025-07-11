const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const registerStaff = async (req, res, db) => {
    const { employeeId, name, role, shiftTimings, department, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const query = `INSERT INTO Staff (EmployeeID, Name, Role, ShiftTimings, Department, Password)
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await db.run(query, [employeeId, name, role, shiftTimings, department, hashedPassword]);
        res.json({ success: true, staffId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

const loginStaff = async (req, res, db) => {
    const { employeeId, password } = req.body;
    const query = 'SELECT * FROM Staff WHERE EmployeeID = ?';

    const staff = await db.get(query, [employeeId]);
    if (!staff) return res.status(401).send('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, staff.Password);
    if (!isPasswordValid) return res.status(404).send('Invalid credentials');

    const token = jwt.sign({ staffId: staff.StaffID, role: staff.Role, name: staff.Name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, staff });
};

const registerGuest = async (req, res, db) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO Guests (FirstName, LastName, Email, Phone, Password, SpecialPreferences)
                   VALUES (?, ?, ?, ?, ?, '')`;

    try {
        const result = await db.run(query, [firstName, lastName, email, phone, hashedPassword]);
        res.json({ success: true, guestId: result.lastID });
    } catch (err) {
        res.status(500).send('Database error');
    }
};
const loginGuest = async (req, res, db) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Guests WHERE Email = ?';

    const guest = await db.get(query, [email]);
    if (!guest) return res.status(401).send('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, guest.password);
    if (!isPasswordValid) return res.status(404).send('Invalid credentials');

    const token = jwt.sign({ guestId: guest.GuestID, role: 'guest' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, guest });
};

module.exports = { registerStaff, loginStaff, registerGuest, loginGuest };
