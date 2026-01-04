# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account (FREE)

## Step 2: Create a Cluster

1. After login, click **"Build a Database"** or **"Create"**
2. Choose **"M0 FREE"** tier (free forever, no credit card needed)
3. Select a cloud provider and region (choose closest to you for better performance):
   - AWS / Google Cloud / Azure
   - Region: India (Mumbai) or Singapore recommended for Bangalore
4. Give your cluster a name (e.g., "Kadlekai-Cluster")
5. Click **"Create Cluster"** (takes 3-5 minutes to deploy)

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `kadlekai_admin`)
5. Click **"Autogenerate Secure Password"** and COPY IT
6. Under "Database User Privileges" select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Whitelist Your IP Address

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0) - easiest for development
   - Or click "Add Current IP Address" for better security
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Select **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open `server/.env` file
2. Replace the connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/kadlekai-parishe?retryWrites=true&w=majority
   ```
3. Replace:
   - `<username>` with your database username
   - `<password>` with the password you copied
   - Add `/kadlekai-parishe` before the `?` (this is your database name)

Example:
```env
MONGODB_URI=mongodb+srv://kadlekai_admin:MyP@ssw0rd123@cluster0.abc12.mongodb.net/kadlekai-parishe?retryWrites=true&w=majority
```

## Step 7: Start Your Server

Open a new terminal in the server directory and run:
```bash
cd server
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

## Troubleshooting

### Error: "Could not connect to MongoDB"
- Check your username and password are correct
- Ensure IP is whitelisted (0.0.0.0/0 for all IPs)
- Verify connection string format

### Error: "Authentication failed"
- Double-check password (no extra spaces)
- Make sure user has correct permissions

### Error: "Network timeout"
- Check your internet connection
- Verify firewall isn't blocking MongoDB ports

## Quick Start Commands

```bash
# Navigate to server folder
cd "c:\Users\jadaw\OneDrive\ドキュメント\visualcode\Kadlekai-Parishe\server"

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

## Viewing Your Data

1. In MongoDB Atlas Dashboard, click **"Browse Collections"**
2. You'll see your database `kadlekai-parishe` with collections:
   - `vendors`
   - `volunteers`
   - `parkings`

You can view, edit, and delete data directly from the Atlas interface!

---

**Need Help?** The complete connection string format is:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```
