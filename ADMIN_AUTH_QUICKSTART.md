# Admin Authentication - Quick Start

## What Was Added

### Backend (Server)
1. **Admin Model** (`server/models/Admin.js`)
   - Username, email, password (hashed), name, role, isActive fields
   - Password hashing with bcryptjs
   - Password comparison method

2. **Authentication Controller** (`server/controllers/authController.js`)
   - Login endpoint
   - Register endpoint (for creating admins)
   - Profile endpoint
   - Token verification endpoint

3. **Auth Middleware** (`server/middleware/auth.js`)
   - JWT token verification
   - Protects admin routes

4. **Auth Routes** (`server/routes/authRoutes.js`)
   - `/api/auth/login` - Login
   - `/api/auth/register` - Register new admin
   - `/api/auth/profile` - Get admin profile
   - `/api/auth/verify` - Verify token

5. **Updated Admin Routes**
   - All `/api/admin/*` routes now require authentication

### Frontend (Client)
1. **AdminLogin Component** (`client/src/components/AdminLogin.jsx`)
   - Beautiful login form with animations
   - Username and password fields
   - Error handling
   - Stores JWT token in localStorage

2. **Updated AdminDashboard**
   - Checks for valid token on load
   - Displays admin name in header
   - Logout button
   - Auto-redirects to login if unauthorized

3. **Updated API Client** (`client/src/api/admin.js`)
   - Automatically adds JWT token to all admin requests
   - Redirects to login on 401 errors

4. **Updated App.jsx**
   - Added admin-login route
   - Custom navigation events for internal routing

### Utilities
1. **Create Admin Script** (`server/createAdmin.js`)
   - Creates initial admin account
   - Default credentials: username=admin, password=admin123

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install bcryptjs jsonwebtoken
```

### 2. Create First Admin
```bash
cd server
node createAdmin.js
```

This creates an admin with:
- Username: `admin`
- Password: `admin123`
- Email: `admin@kadlekai-parishe.com`
- Role: `super-admin`

### 3. Start the Application
```bash
# From project root
.\start-dev.bat
```

### 4. Login
1. Navigate to the Admin section (it will redirect to login)
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click Login

You'll be redirected to the admin dashboard!

## How It Works

### Authentication Flow
1. User enters username/password on login page
2. Backend validates credentials and returns JWT token
3. Token stored in browser's localStorage
4. All admin API calls include token in Authorization header
5. Backend middleware verifies token before processing requests
6. Invalid/expired tokens redirect user back to login

### Security Features
✅ Password hashing with bcryptjs (10 salt rounds)
✅ JWT tokens with 7-day expiry
✅ Protected admin routes with middleware
✅ Auto-logout on invalid token
✅ Account active/inactive status
✅ Last login tracking

## Testing

### Test Login
1. Go to admin section
2. Should see login page
3. Enter: username=`admin`, password=`admin123`
4. Should redirect to dashboard with logout button

### Test Protected Routes
1. Clear localStorage in browser dev tools
2. Try accessing admin dashboard
3. Should redirect to login

### Test Logout
1. Click logout button in dashboard
2. Should redirect to login
3. Token should be cleared from localStorage

## Creating Additional Admins

Edit `createAdmin.js` and change the credentials, then run:
```bash
node createAdmin.js
```

Or use the register endpoint (should be disabled in production):
```bash
POST http://localhost:5000/api/auth/register
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "secure-password",
  "name": "Admin Name",
  "role": "admin"
}
```

## Important Notes

⚠️ **Change the default password** after first login!

⚠️ **Set JWT_SECRET** in `.env` file:
```
JWT_SECRET=your-super-secret-key-here
```

⚠️ **Disable registration in production** - Comment out or remove the register route in production to prevent unauthorized admin creation.

## Files Modified

### Backend
- ✅ `server/server.js` - Added auth routes, protected admin routes
- ✅ `server/routes/adminRoutes.js` - Added auth middleware
- ✅ `server/package.json` - Added bcryptjs, jsonwebtoken
- ✅ `server/models/Admin.js` - NEW
- ✅ `server/controllers/authController.js` - NEW
- ✅ `server/middleware/auth.js` - NEW
- ✅ `server/routes/authRoutes.js` - NEW
- ✅ `server/createAdmin.js` - NEW

### Frontend
- ✅ `client/src/App.jsx` - Added admin-login route, navigation events
- ✅ `client/src/components/AdminDashboard.jsx` - Added auth check, logout
- ✅ `client/src/components/AdminLogin.jsx` - NEW
- ✅ `client/src/api/admin.js` - Added token headers

### Documentation
- ✅ `ADMIN_AUTH_GUIDE.md` - NEW (Complete authentication guide)
- ✅ `ADMIN_AUTH_QUICKSTART.md` - NEW (This file)

## Troubleshooting

**Can't login**: Make sure you created an admin first with `node createAdmin.js`

**401 errors**: Token expired or invalid - login again

**Module errors**: Run `npm install` in server directory

**Database connection**: Check MongoDB Atlas is running and connection string is correct
