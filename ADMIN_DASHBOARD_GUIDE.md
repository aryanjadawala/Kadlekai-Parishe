# Admin Dashboard - Complete Guide

## 🎯 Overview

The Admin Dashboard is a comprehensive management system for the Kadlekai Parishe festival that allows administrators to:

- **Approve/Reject** vendor and volunteer applications
- **Assign roles and areas** to volunteers
- **View real-time analytics** including footfall, parking occupancy
- **Monitor statistics** for all festival operations
- **Manage** all aspects of the festival from one central location

---

## 🚀 Features

### 1. **Dashboard Overview**
- Total vendors, volunteers, parking slots
- Pending approvals count
- Today's footfall vs total footfall
- Real-time parking occupancy
- Category-wise vendor distribution
- Role-wise volunteer distribution

### 2. **Vendor Management**
- View all vendors with filtering (all, pending, approved, rejected, active)
- Approve or reject vendor applications
- View detailed vendor information including:
  - Business details
  - Product categories
  - Contact information
  - Address and GST details
- Assign stall numbers and locations

### 3. **Volunteer Management**
- View all volunteers with status filtering
- Approve volunteers with role assignment
- Assign specific areas and shift timings
- View volunteer profiles including:
  - Personal information
  - Emergency contacts
  - Experience level
  - T-shirt size
- Display approved volunteers as public profiles

### 4. **Analytics Dashboard**
- **Footfall Analytics**:
  - Hourly footfall tracking
  - Zone-wise distribution
  - Period selection (Today/Week/Month)
  
- **Volunteer Distribution**:
  - By shift timing
  - By assigned role
  
- **Vendor Categories**:
  - Visual breakdown of product categories
  - Count per category

---

## 📊 API Endpoints

### Admin Routes (`/api/admin/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats` | Get dashboard statistics |
| GET | `/pending` | Get pending approvals |
| GET | `/activities` | Get recent activities |
| GET | `/footfall?period=today` | Get footfall analytics |
| PUT | `/vendors/:id/status` | Update vendor status |
| PUT | `/volunteers/:id/status` | Update volunteer status |

### Request Examples

#### Approve Vendor
```bash
PUT /api/admin/vendors/:id/status
Content-Type: application/json

{
  "status": "approved",
  "stallNumber": "A-101",
  "stallLocation": "Main Road Section",
  "notes": "Assigned stall near entrance"
}
```

#### Approve Volunteer with Assignment
```bash
PUT /api/admin/volunteers/:id/status
Content-Type: application/json

{
  "status": "approved",
  "assignedRole": "Crowd Management",
  "assignedArea": "Bull Temple Road",
  "shiftTiming": "Morning (6AM-12PM)",
  "notes": "Experienced volunteer"
}
```

---

## 🎨 Component Structure

```
AdminDashboard.jsx (Main Container)
├── admin/
│   ├── DashboardOverview.jsx    # Overview stats & charts
│   ├── VendorManagement.jsx     # Vendor approval & management
│   ├── VolunteerManagement.jsx  # Volunteer approval & assignment
│   └── Analytics.jsx            # Footfall & data visualization
```

---

## 🔐 Access

**Navigation**: Click **"🔐 Admin"** in the navbar

> **Note**: In production, you should add authentication to protect admin routes. For now, it's accessible to demonstrate functionality.

---

## 📋 Workflow Examples

### Approving a Volunteer

1. Navigate to Admin Dashboard → **Volunteers** tab
2. Click on **"Registered"** filter to see pending applications
3. Click **"View Details"** on a volunteer card
4. Review their information and emergency contacts
5. Assign:
   - **Role**: Select from dropdown (e.g., Crowd Management)
   - **Area**: Enter specific location (e.g., "Bull Temple Road")
   - **Shift**: Select timing (e.g., Morning 6AM-12PM)
6. Click **"✅ Approve Volunteer"**
7. The volunteer now appears in the **"Volunteer Team"** public page!

### Approving a Vendor

1. Navigate to Admin Dashboard → **Vendors** tab
2. Filter by **"Pending"**
3. Click **"View"** to see full vendor details
4. Review business information, product category, contact details
5. Click **"✅ Approve"** or **"❌ Reject"**
6. Approved vendors can be assigned stall numbers later

### Viewing Analytics

1. Navigate to Admin Dashboard → **Analytics** tab
2. **Footfall Analytics**:
   - Select period (Today/Week/Month)
   - View hourly distribution chart
   - See zone-wise parking data
3. **Quick Statistics**:
   - Total vendors/volunteers
   - Active volunteers
   - Parking occupancy
   - Total footfall count

---

## 📈 Statistics Tracked

### Vendor Statistics
- Total vendors
- Pending approvals
- Approved vendors
- Category distribution
- Active vs inactive

### Volunteer Statistics
- Total registered
- Pending approvals
- Active volunteers
- Role distribution
- Shift distribution

### Parking & Footfall
- Total parking slots
- Current occupancy
- Available slots
- Hourly footfall
- Zone-wise distribution
- Today's vs total footfall

---

## 🎭 Public Volunteer Profiles

Once approved by admin, volunteers appear on the **"Volunteer Team"** page:
- Displays name, role, area, shift
- Filterable by role
- Shows experience level
- Optional contact information
- Professional card layout with avatars

**Access**: Navigate to **"Volunteer Team"** in the main navbar

---

## 🛠️ Customization

### Adding New Roles
Edit in `client/src/components/admin/VolunteerManagement.jsx`:
```javascript
<option value="New Role">New Role</option>
```

Also update the backend enum in `server/models/Volunteer.js`:
```javascript
assignedRole: {
  enum: [...existingRoles, 'New Role']
}
```

### Adding New Vendor Categories
Edit in `server/models/Vendor.js`:
```javascript
productCategory: {
  enum: ['Groundnuts', 'Food', ..., 'New Category']
}
```

### Customizing Analytics Period
Edit in `client/src/components/admin/Analytics.jsx`:
```javascript
<option value="custom">Custom Range</option>
```

---

## 🎨 UI Features

- **Framer Motion** animations for smooth transitions
- **Color-coded status badges** (Green=Approved, Yellow=Pending, etc.)
- **Responsive grid layouts** for all screen sizes
- **Real-time data updates** with refresh buttons
- **Modal dialogs** for detailed views
- **Progress bars** for visual data representation
- **Filter buttons** for easy data navigation

---

## 🔄 Data Flow

1. **Vendor/Volunteer** submits form → Saved as "pending"/"registered"
2. **Admin** views in dashboard → Filters by status
3. **Admin** reviews and approves → Status updated to "approved"
4. **Approved volunteers** → Displayed on public "Volunteer Team" page
5. **Statistics** → Updated in real-time across dashboard

---

## 📱 Responsive Design

All admin components are fully responsive:
- **Mobile**: Single column layout, stacked cards
- **Tablet**: 2-column grid for cards
- **Desktop**: 3-4 column grid, side-by-side views
- **Navigation**: Collapsible tabs on smaller screens

---

## 🚀 Quick Start

1. **Start servers**:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. **Access admin dashboard**:
   - Navigate to `http://localhost:5173`
   - Click **"🔐 Admin"** in navbar

3. **Test workflow**:
   - Register a volunteer via "Join as Volunteer"
   - Go to Admin → Volunteers → View pending
   - Approve and assign role/area
   - Check "Volunteer Team" page to see public profile

---

## 🎯 Future Enhancements

- [ ] Admin authentication/login
- [ ] Email notifications to approved volunteers/vendors
- [ ] Export data as CSV/PDF
- [ ] Advanced filtering and search
- [ ] Bulk approve/reject operations
- [ ] Role-based permissions
- [ ] Activity logs and audit trail
- [ ] Custom reporting tools

---

## 📞 Support

For issues or questions about the admin dashboard, check the main `INTEGRATION_GUIDE.md` or review the API documentation in `server/README.md`.
