import dotenv from 'dotenv';
import readline from 'readline';
import connectDB from './config/database.js';
import Admin from './models/Admin.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createNewAdmin = async () => {
  try {
    await connectDB();

    console.log('\n🔧 Create New Admin Account');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const username = await question('Username: ');
    const email = await question('Email: ');
    const password = await question('Password: ');
    const name = await question('Full Name: ');
    const roleInput = await question('Role (admin/super-admin) [admin]: ');
    const role = roleInput.trim() || 'admin';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingAdmin) {
      console.log('\n❌ Admin already exists with this email or username');
      rl.close();
      process.exit(1);
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      name,
      role
    });

    console.log('\n✅ Admin created successfully!');
    console.log('\n📋 Admin Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`Role: ${role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    rl.close();
    process.exit(1);
  }
};

const changePassword = async () => {
  try {
    await connectDB();

    console.log('\n🔐 Change Admin Password');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const username = await question('Username: ');
    const newPassword = await question('New Password: ');

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log('\n❌ Admin not found');
      rl.close();
      process.exit(1);
    }

    admin.password = newPassword;
    await admin.save();

    console.log('\n✅ Password changed successfully!');
    console.log(`Username: ${username}\n`);
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error changing password:', error.message);
    rl.close();
    process.exit(1);
  }
};

const listAdmins = async () => {
  try {
    await connectDB();

    const admins = await Admin.find({});

    console.log('\n👥 Admin Accounts');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (admins.length === 0) {
      console.log('No admin accounts found\n');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.name} (@${admin.username})`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Status: ${admin.isActive ? '✅ Active' : '❌ Inactive'}`);
        console.log(`   Last Login: ${admin.lastLogin || 'Never'}`);
        console.log('');
      });
    }
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error listing admins:', error.message);
    rl.close();
    process.exit(1);
  }
};

const deleteAdmin = async () => {
  try {
    await connectDB();

    console.log('\n🗑️  Delete Admin Account');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const username = await question('Username to delete: ');
    const confirm = await question(`Are you sure you want to delete "${username}"? (yes/no): `);

    if (confirm.toLowerCase() !== 'yes') {
      console.log('\n❌ Deletion cancelled');
      rl.close();
      process.exit(0);
    }

    const result = await Admin.deleteOne({ username });

    if (result.deletedCount === 0) {
      console.log('\n❌ Admin not found');
    } else {
      console.log(`\n✅ Admin "${username}" deleted successfully\n`);
    }
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error deleting admin:', error.message);
    rl.close();
    process.exit(1);
  }
};

const main = async () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Kadlekai Parishe Admin Manager      ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('1. Create new admin');
  console.log('2. Change password');
  console.log('3. List all admins');
  console.log('4. Delete admin');
  console.log('5. Exit\n');

  const choice = await question('Select option (1-5): ');

  switch (choice.trim()) {
    case '1':
      await createNewAdmin();
      break;
    case '2':
      await changePassword();
      break;
    case '3':
      await listAdmins();
      break;
    case '4':
      await deleteAdmin();
      break;
    case '5':
      console.log('\nGoodbye!\n');
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('\n❌ Invalid option');
      rl.close();
      process.exit(1);
  }
};

main();
