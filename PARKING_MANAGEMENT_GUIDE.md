# Parking Management Guide

## How to Update Parking Data

### 1. Using the API (Backend)

#### Check-In a Vehicle (Occupy a Slot)
```bash
POST http://localhost:5000/api/parking/:slotId/checkin

# Request Body:
{
  "vehicleNumber": "KA01AB1234",
  "driverName": "John Doe",
  "driverContact": "9876543210",
  "attendant": "Attendant Name"
}
```

#### Check-Out a Vehicle (Free a Slot)
```bash
POST http://localhost:5000/api/parking/:slotId/checkout

# This will:
# - Mark slot as available
# - Clear vehicle details
# - Calculate parking duration and fee
```

#### Update Parking Slot Details
```bash
PUT http://localhost:5000/api/parking/:slotId

# Request Body (example - update any field):
{
  "status": "occupied",
  "vehicleNumber": "KA02XY5678",
  "vehicleType": "Four Wheeler"
}
```

#### Create New Parking Slot
```bash
POST http://localhost:5000/api/parking

# Request Body:
{
  "slotNumber": "A-101",
  "zone": "Zone A",
  "vehicleType": "Two Wheeler",
  "status": "available"
}
```

### 2. Using MongoDB Compass (GUI)

1. **Connect to MongoDB Atlas**:
   - Open MongoDB Compass
   - Use your connection string: `mongodb+srv://aryan222:aryanfwd222@cluster0.wufgzvm.mongodb.net/`
   - Select database: `kadlekai-parishe`
   - Select collection: `parkings`

2. **Insert New Parking Slot**:
   ```json
   {
     "slotNumber": "A-15",
     "zone": "Zone A",
     "vehicleType": "Four Wheeler",
     "status": "available",
     "isOccupied": false
   }
   ```

3. **Update Existing Slot** (Mark as Occupied):
   - Find the document by slotNumber
   - Update fields:
   ```json
   {
     "status": "occupied",
     "isOccupied": true,
     "vehicleNumber": "KA01MN7890",
     "driverName": "Ram Kumar",
     "driverContact": "9988776655",
     "entryTime": "2026-01-04T10:30:00.000Z"
   }
   ```

4. **Update to Available**:
   ```json
   {
     "status": "available",
     "isOccupied": false,
     "vehicleNumber": null,
     "driverName": null,
     "driverContact": null,
     "exitTime": "2026-01-04T12:30:00.000Z"
   }
   ```

### 3. Using Terminal/Postman

#### Example: Check-in a vehicle to slot ID
```bash
curl -X POST http://localhost:5000/api/parking/SLOT_ID/checkin \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleNumber": "KA03CD4567",
    "driverName": "Lakshmi Devi",
    "driverContact": "9123456789",
    "attendant": "Volunteer-1"
  }'
```

#### Example: Update slot status
```bash
curl -X PUT http://localhost:5000/api/parking/SLOT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "maintenance"
  }'
```

### 4. Parking Status Values

**Status Options**:
- `available` - Slot is empty and ready
- `occupied` - Vehicle is parked
- `reserved` - Slot is reserved
- `maintenance` - Slot under maintenance

**Vehicle Types**:
- `Two Wheeler` - Bikes/Scooters
- `Four Wheeler` - Cars
- `Heavy Vehicle` - Buses/Trucks
- `Any` - Can accommodate any type

**Zones**:
- `Zone A`
- `Zone B`
- `Zone C`
- `VIP Zone`
- `Two Wheeler Zone`
- `Four Wheeler Zone`

### 5. Quick Admin Script (MongoDB Shell)

Connect to your database and run:

```javascript
// Mark slot A-10 as occupied
db.parkings.updateOne(
  { slotNumber: "A-10" },
  { 
    $set: { 
      status: "occupied",
      isOccupied: true,
      vehicleNumber: "KA01AB1234",
      driverName: "Test Driver",
      entryTime: new Date()
    }
  }
);

// Free up slot A-10
db.parkings.updateOne(
  { slotNumber: "A-10" },
  { 
    $set: { 
      status: "available",
      isOccupied: false,
      exitTime: new Date()
    },
    $unset: {
      vehicleNumber: "",
      driverName: "",
      driverContact: ""
    }
  }
);

// Get all occupied slots
db.parkings.find({ status: "occupied" });

// Get Zone A statistics
db.parkings.aggregate([
  { $match: { zone: "Zone A" } },
  { $group: {
    _id: "$status",
    count: { $sum: 1 }
  }}
]);
```

## Automated Real-Time Updates

The parking status page automatically refreshes every 30 seconds. Any changes made via API or database will be visible within 30 seconds on the live page.

## Troubleshooting

**Slot shows as occupied but should be available**:
```javascript
// Reset the slot
db.parkings.updateOne(
  { slotNumber: "SLOT-NUMBER" },
  { 
    $set: { status: "available", isOccupied: false },
    $unset: { vehicleNumber: "", driverName: "", driverContact: "" }
  }
);
```

**Need to bulk update zones**:
```javascript
// Change all Zone D slots to Zone A
db.parkings.updateMany(
  { zone: "Zone D" },
  { $set: { zone: "Zone A" } }
);
```
