import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminData = {
      username: 'admin',
      email: 'admin@kadlekai-parishe.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'super-admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email: adminData.email }, { username: adminData.username }] 
    });

    if (existingAdmin) {
      console.log('❌ Admin already exists with this email or username');
      process.exit(1);
    }

    const admin = await Admin.create(adminData);

    console.log('✅ Admin created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Email: ${adminData.email}`);
    console.log(`Role: ${adminData.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔒 Please change the password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
