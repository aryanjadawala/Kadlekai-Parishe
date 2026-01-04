# Kadlekai Parishe - Backend API

Backend server for the Kadlekai Parishe festival management system. Built with Node.js, Express, and MongoDB.

## Features

- **Vendor Management**: Register, manage, and track festival vendors
- **Volunteer Management**: Handle volunteer registrations and assignments
- **Parking Management**: Real-time parking slot management with check-in/check-out functionality

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`

### MongoDB Setup Options

#### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get your connection string and update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/kadlekai-parishe?retryWrites=true&w=majority
```

#### Option 2: Local MongoDB
1. Download and install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use this connection string in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/kadlekai-parishe
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Vendors
- `GET /api/vendors` - Get all vendors (with optional filters)
- `GET /api/vendors/:id` - Get single vendor
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor
- `GET /api/vendors/stats` - Get vendor statistics

### Volunteers
- `GET /api/volunteers` - Get all volunteers (with optional filters)
- `GET /api/volunteers/:id` - Get single volunteer
- `POST /api/volunteers` - Register new volunteer
- `PUT /api/volunteers/:id` - Update volunteer
- `DELETE /api/volunteers/:id` - Delete volunteer
- `GET /api/volunteers/stats` - Get volunteer statistics

### Parking
- `GET /api/parking` - Get all parking slots (with optional filters)
- `GET /api/parking/:id` - Get single parking slot
- `POST /api/parking` - Create new parking slot
- `PUT /api/parking/:id` - Update parking slot
- `DELETE /api/parking/:id` - Delete parking slot
- `POST /api/parking/:id/checkin` - Check-in vehicle
- `POST /api/parking/:id/checkout` - Check-out vehicle
- `GET /api/parking/stats` - Get parking statistics

## Query Parameters

### Vendors
- `status`: Filter by status (pending, approved, rejected, active, inactive)
- `productCategory`: Filter by product category

### Volunteers
- `status`: Filter by status (registered, approved, active, inactive, completed)
- `assignedRole`: Filter by role
- `shiftTiming`: Filter by shift

### Parking
- `zone`: Filter by parking zone
- `status`: Filter by status (available, occupied, reserved, maintenance)
- `vehicleType`: Filter by vehicle type
- `isOccupied`: Filter by occupation status (true/false)

## Example Requests

### Create a Vendor
```bash
POST http://localhost:5000/api/vendors
Content-Type: application/json

{
  "name": "John Doe",
  "businessName": "Groundnut Paradise",
  "contactNumber": "9876543210",
  "email": "john@example.com",
  "productCategory": "Groundnuts",
  "productDescription": "Fresh roasted groundnuts"
}
```

### Register a Volunteer
```bash
POST http://localhost:5000/api/volunteers
Content-Type: application/json

{
  "name": "Jane Smith",
  "contactNumber": "9876543211",
  "email": "jane@example.com",
  "age": 25,
  "assignedRole": "Crowd Management",
  "emergencyContact": {
    "name": "Parent Name",
    "phone": "9876543212",
    "relation": "Mother"
  }
}
```

### Create Parking Slot
```bash
POST http://localhost:5000/api/parking
Content-Type: application/json

{
  "slotNumber": "A-101",
  "zone": "Zone A",
  "vehicleType": "Four Wheeler"
}
```

### Check-in Vehicle
```bash
POST http://localhost:5000/api/parking/:id/checkin
Content-Type: application/json

{
  "vehicleNumber": "KA01AB1234",
  "driverName": "Driver Name",
  "driverContact": "9876543213",
  "attendant": "Attendant Name"
}
```

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Vendor.js           # Vendor schema
│   ├── Volunteer.js        # Volunteer schema
│   └── Parking.js          # Parking schema
├── controllers/
│   ├── vendorController.js
│   ├── volunteerController.js
│   └── parkingController.js
├── routes/
│   ├── vendorRoutes.js
│   ├── volunteerRoutes.js
│   └── parkingRoutes.js
├── .env                    # Environment variables
├── .env.example            # Example environment file
├── .gitignore
├── package.json
└── server.js              # Main application file
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CLIENT_URL`: Frontend URL for CORS (default: http://localhost:5173)

## License

ISC
