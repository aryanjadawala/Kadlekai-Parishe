# Admin Authentication Guide

## Overview
The admin dashboard is now secured with JWT-based authentication. Only authorized users with valid credentials can access the admin panel.

## Initial Setup

### 1. Install Dependencies
First, install the required packages:
```bash
cd server
npm install bcryptjs jsonwebtoken
```

### 2. Create Initial Admin Account
Run the admin creation script to create your first admin account:
```bash
node createAdmin.js
```

This will create a default admin with these credentials:
- **Username**: `admin`
- **Email**: `admin@kadlekai-parishe.com`
- **Password**: `admin123`
- **Role**: `super-admin`

⚠️ **Important**: Change this password after first login!

## Login Process

### 1. Access the Login Page
Navigate to the admin login page by clicking "Admin" in the navbar, or directly visit `/admin-login`.

### 2. Enter Credentials
- Enter your username and password
- Click the "Login" button

### 3. Successful Login
Upon successful authentication:
- You receive a JWT token (valid for 7 days)
- The token is stored in browser's localStorage
- You're automatically redirected to the admin dashboard
- Your name appears in the dashboard header

## Security Features

### Token-Based Authentication
- All admin API requests require a valid JWT token
- Tokens are sent in the `Authorization` header as `Bearer <token>`
- Tokens expire after 7 days
- Invalid/expired tokens automatically redirect to login

### Protected Routes
All admin endpoints are protected:
- `/api/admin/stats` - Dashboard statistics
- `/api/admin/pending` - Pending approvals
- `/api/admin/vendors/:id/status` - Vendor approval
- `/api/admin/volunteers/:id/status` - Volunteer approval
- `/api/admin/activities` - Recent activities
- `/api/admin/footfall` - Analytics data

### Auto-Logout on Unauthorized
- Invalid token → Redirected to login
- 401 responses → Token cleared, redirected to login
- Manual logout → Token cleared, redirected to login

## Admin Management

### Admin Model Fields
- `username` - Unique username (min 3 chars)
- `email` - Unique email address
- `password` - Hashed with bcryptjs (min 6 chars)
- `name` - Display name
- `role` - Either 'admin' or 'super-admin'
- `isActive` - Account status (true/false)
- `lastLogin` - Last login timestamp

### Creating Additional Admins
You can create more admins programmatically or by modifying the `createAdmin.js` script:

```javascript
const adminData = {
  username: 'newadmin',
  email: 'newadmin@example.com',
  password: 'secure-password',
  name: 'New Admin Name',
  role: 'admin' // or 'super-admin'
};
```

## API Endpoints

### Public Auth Endpoints

#### POST `/api/auth/login`
Login with credentials
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "...",
    "username": "admin",
    "email": "admin@kadlekai-parishe.com",
    "name": "Admin User",
    "role": "super-admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/register`
Register new admin (should be restricted in production)
```json
{
  "username": "newadmin",
  "email": "admin@example.com",
  "password": "password123",
  "name": "Admin Name",
  "role": "admin"
}
```

### Protected Auth Endpoints

#### GET `/api/auth/profile`
Get current admin profile (requires token)

Headers:
```
Authorization: Bearer <token>
```

#### GET `/api/auth/verify`
Verify token validity (requires token)

## Troubleshooting

### "Invalid credentials" Error
- Check username and password are correct
- Ensure admin account exists in database
- Verify account is active (`isActive: true`)

### "Not authorized" Error
- Token may be expired (7 day expiry)
- Token may be invalid
- Try logging in again

### Can't Access Admin Dashboard
- Ensure you've logged in first
- Check browser's localStorage for `adminToken`
- Verify token hasn't expired
- Check browser console for errors

## Security Best Practices

1. **Change Default Password**: Always change the default admin password
2. **Strong Passwords**: Use passwords with min 8 characters, including uppercase, lowercase, numbers
3. **Limit Admin Accounts**: Only create accounts for trusted users
4. **Regular Token Rotation**: Tokens expire after 7 days
5. **HTTPS in Production**: Always use HTTPS in production
6. **Environment Variables**: Store JWT_SECRET in .env file
7. **Disable Registration**: In production, disable the `/api/auth/register` endpoint

## Environment Variables

Add to `.env` file:
```
JWT_SECRET=your-very-secret-key-here-change-this
```

If not set, defaults to `kadlekai-parishe-secret-key` (change in production!)

## Logging Out

Click the "Logout" button in the dashboard header to:
- Clear authentication token
- Clear admin data
- Redirect to login page

## Session Management

- **Token Storage**: LocalStorage
- **Token Expiry**: 7 days
- **Auto-refresh**: Not implemented (re-login after expiry)
- **Remember me**: Not implemented
