-- Guests Table
CREATE TABLE Guests (
    GuestID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT,
    Email TEXT UNIQUE,
    Phone TEXT,
    IDType TEXT,
    IDNumber TEXT,
    LoyaltyPoints INTEGER DEFAULT 0,
    MembershipTier TEXT,
    Preferences TEXT,
    SpecialPreferences TEXT
    
);

-- Rooms Table
CREATE TABLE Rooms (
    RoomID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoomNumber TEXT UNIQUE,
    RoomTypeID INTEGER,
    Floor INTEGER,
    Status TEXT CHECK (Status IN ('available', 'occupied', 'maintenance')),
    PricePerNight REAL,
    Amenities TEXT,
    FOREIGN KEY (RoomTypeID) REFERENCES RoomTypes(RoomTypeID)
);

-- Room Types Table
CREATE TABLE RoomTypes (
    RoomTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    Category TEXT,
    BasePrice REAL,
    MaxOccupancy INTEGER,
    Amenities TEXT
);

-- Bookings Table
CREATE TABLE Bookings (
    BookingID INTEGER PRIMARY KEY AUTOINCREMENT,
    GuestID INTEGER,
    RoomID INTEGER,
    CheckInDate TEXT,
    CheckOutDate TEXT,
    Status TEXT CHECK (Status IN ('upcoming', 'active', 'completed', 'cancelled')),
    SpecialRequests TEXT,
    PaymentStatus TEXT CHECK (PaymentStatus IN ('partial', 'completed', 'pending')),
    FOREIGN KEY (GuestID) REFERENCES Guests(GuestID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

-- Staff Table
CREATE TABLE Staff (
    StaffID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmployeeID TEXT UNIQUE,
    Name TEXT,
    Role TEXT,
    ShiftTimings TEXT,
    Department TEXT,
    Password TEXT
);

-- Housekeeping Table
CREATE TABLE Housekeeping (
    HousekeepingID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoomID INTEGER,
    StaffID INTEGER,
    CleaningSchedule TEXT,
    CleaningStatus TEXT CHECK (CleaningStatus IN ('pending', 'in-progress', 'completed')),
    SpecialRequests TEXT,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

-- Menu Items Table
CREATE TABLE MenuItems (
    MenuItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Category TEXT,
    Price REAL,
    AvailabilityStatus TEXT CHECK (AvailabilityStatus IN ('available', 'unavailable')),
    PreparationTime INTEGER
);

-- Restaurant Orders Table
CREATE TABLE RestaurantOrders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    BookingID INTEGER,
    DeliveryStatus TEXT CHECK (DeliveryStatus IN ('preparing', 'delivered', 'cancelled')),
    BillAmount REAL,
    OrderTime TEXT,
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);

-- Order Items Table (Many-to-Many relation)
CREATE TABLE OrderItems (
    OrderItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER,
    MenuItemID INTEGER,
    Quantity INTEGER,
    SpecialInstructions TEXT,
    FOREIGN KEY (OrderID) REFERENCES RestaurantOrders(OrderID),
    FOREIGN KEY (MenuItemID) REFERENCES MenuItems(MenuItemID)
);

-- Bills Table
CREATE TABLE Bills (
    BillID INTEGER PRIMARY KEY AUTOINCREMENT,
    BookingID INTEGER,
    RoomCharges REAL,
    RestaurantCharges REAL,
    AdditionalServices REAL,
    Taxes REAL,
    TotalAmount REAL,
    PaymentDetails TEXT,
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);

-- Inventory Table
CREATE TABLE Inventory (
    InventoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    ItemName TEXT,
    Category TEXT,
    CurrentStock INTEGER,
    ReorderPoint INTEGER,
    Supplier TEXT,
    Unit TEXT
);

-- Amenities Table
CREATE TABLE Amenities (
    AmenityID INTEGER PRIMARY KEY AUTOINCREMENT,
    GuestID INTEGER,
    AmenityType TEXT,
    BookingDate TEXT,
    TimeSlot TEXT,
    AdditionalCharge REAL,
    FOREIGN KEY (GuestID) REFERENCES Guests(GuestID)
);

-- Complaints and Requests Table
CREATE TABLE ComplaintsRequests (
    RequestID INTEGER PRIMARY KEY AUTOINCREMENT,
    GuestID INTEGER,
    RoomID INTEGER,
    Type TEXT CHECK (Type IN ('maintenance', 'service', 'complaint')),
    Priority TEXT CHECK (Priority IN ('low', 'medium', 'high', 'urgent')),
    Description TEXT,
    PreferredTime TEXT,
    ResolutionStatus TEXT CHECK (ResolutionStatus IN ('pending', 'resolved')),
    ResolutionDetails TEXT,
    FOREIGN KEY (GuestID) REFERENCES Guests(GuestID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);
