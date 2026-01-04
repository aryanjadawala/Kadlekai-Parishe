import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vendor from './models/Vendor.js';
import Volunteer from './models/Volunteer.js';
import Parking from './models/Parking.js';

dotenv.config();

const sampleVendors = [
  {
    name: 'Rajesh Kumar',
    businessName: 'Kumar Peanut Paradise',
    contactNumber: '9876543210',
    email: 'rajesh.kumar@example.com',
    productCategory: 'Groundnuts',
    productDescription: 'Fresh roasted peanuts, masala peanuts, and special kadlekai varieties',
    status: 'approved',
    stallNumber: 'A-101',
    address: { street: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001' }
  },
  {
    name: 'Lakshmi Devi',
    businessName: 'Lakshmi Bangles & Jewelry',
    contactNumber: '9876543211',
    email: 'lakshmi.bangles@example.com',
    productCategory: 'Bangles',
    productDescription: 'Traditional glass bangles, lac bangles, and imitation jewelry',
    status: 'approved',
    stallNumber: 'B-205',
    address: { street: 'Jayanagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560041' }
  },
  {
    name: 'Venkatesh Rao',
    businessName: 'Venky Foods Corner',
    contactNumber: '9876543212',
    email: 'venkatesh.foods@example.com',
    productCategory: 'Food',
    productDescription: 'Chaat, pani puri, dosa, and South Indian snacks',
    status: 'approved',
    stallNumber: 'C-150',
    address: { street: 'Basavanagudi', city: 'Bengaluru', state: 'Karnataka', pincode: '560004' }
  },
  {
    name: 'Priya Sharma',
    businessName: 'Tiny Tots Toy Shop',
    contactNumber: '9876543213',
    email: 'priya.toys@example.com',
    productCategory: 'Toys',
    productDescription: 'Traditional wooden toys, stuffed toys, and educational games for children',
    status: 'pending',
    address: { street: 'Malleshwaram', city: 'Bengaluru', state: 'Karnataka', pincode: '560003' }
  },
  {
    name: 'Manjunath Reddy',
    businessName: 'Karnataka Woodcraft',
    contactNumber: '9876543214',
    email: 'manju.wood@example.com',
    productCategory: 'Wooden Works',
    productDescription: 'Hand-carved wooden statues, furniture, and decorative items',
    status: 'approved',
    stallNumber: 'D-320',
    address: { street: 'Rajajinagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560010' }
  },
  {
    name: 'Anita Menon',
    businessName: 'Anita Decorative Arts',
    contactNumber: '9876543215',
    email: 'anita.decor@example.com',
    productCategory: 'Decorative Items',
    productDescription: 'Home decor, rangoli items, diyas, and festival decorations',
    status: 'approved',
    stallNumber: 'E-112',
    address: { street: 'Indiranagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560038' }
  },
  {
    name: 'Suresh Patil',
    businessName: 'Patil Groundnut Specials',
    contactNumber: '9876543216',
    email: 'suresh.groundnut@example.com',
    productCategory: 'Groundnuts',
    productDescription: 'Organic groundnuts, peanut butter, and roasted varieties',
    status: 'pending',
    address: { street: 'JP Nagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560078' }
  },
  {
    name: 'Kavitha Nair',
    businessName: 'Kerala Snacks Corner',
    contactNumber: '9876543217',
    email: 'kavitha.snacks@example.com',
    productCategory: 'Food',
    productDescription: 'Banana chips, mixture, murukku, and traditional Kerala snacks',
    status: 'approved',
    stallNumber: 'C-225',
    address: { street: 'Koramangala', city: 'Bengaluru', state: 'Karnataka', pincode: '560034' }
  },
  {
    name: 'Ramesh Gowda',
    businessName: 'Traditional Handicrafts',
    contactNumber: '9876543218',
    email: 'ramesh.crafts@example.com',
    productCategory: 'Handicrafts',
    productDescription: 'Handmade crafts, pottery, and traditional Karnataka art pieces',
    status: 'approved',
    stallNumber: 'F-180',
    address: { street: 'Vijayanagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560040' }
  },
  {
    name: 'Deepa Iyer',
    businessName: 'Deepa Fashion Accessories',
    contactNumber: '9876543219',
    email: 'deepa.fashion@example.com',
    productCategory: 'Bangles',
    productDescription: 'Designer bangles, hair accessories, and fashion jewelry',
    status: 'rejected',
    address: { street: 'BTM Layout', city: 'Bengaluru', state: 'Karnataka', pincode: '560076' }
  }
];

const sampleVolunteers = [
  {
    name: 'Arun Kumar',
    contactNumber: '9123456789',
    email: 'arun.kumar@example.com',
    age: 25,
    gender: 'Male',
    assignedRole: 'Crowd Management',
    assignedArea: 'Bull Temple Road - Main Entrance',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'L',
    emergencyContact: { name: 'Kumar Swamy', phone: '9123456780', relation: 'Father' }
  },
  {
    name: 'Sowmya Reddy',
    contactNumber: '9123456790',
    email: 'sowmya.reddy@example.com',
    age: 22,
    gender: 'Female',
    assignedRole: 'Information Desk',
    assignedArea: 'Main Gate Information Counter',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'First Time',
    status: 'approved',
    tshirtSize: 'M',
    emergencyContact: { name: 'Reddy Lakshmi', phone: '9123456791', relation: 'Mother' }
  },
  {
    name: 'Karthik Hegde',
    contactNumber: '9123456792',
    email: 'karthik.hegde@example.com',
    age: 28,
    gender: 'Male',
    assignedRole: 'Parking Management',
    assignedArea: 'Zone A - Two Wheeler Section',
    shiftTiming: 'Full Day',
    experience: 'Very Experienced (3+ events)',
    status: 'active',
    tshirtSize: 'XL',
    emergencyContact: { name: 'Hegde Priya', phone: '9123456793', relation: 'Wife' }
  },
  {
    name: 'Divya Menon',
    contactNumber: '9123456794',
    email: 'divya.menon@example.com',
    age: 24,
    gender: 'Female',
    assignedRole: 'Medical Support',
    assignedArea: 'Medical Tent - Central Location',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'S',
    emergencyContact: { name: 'Menon Radha', phone: '9123456795', relation: 'Mother' }
  },
  {
    name: 'Vikram Singh',
    contactNumber: '9123456796',
    email: 'vikram.singh@example.com',
    age: 30,
    gender: 'Male',
    assignedRole: 'Security',
    assignedArea: 'VIP Zone Security',
    shiftTiming: 'Evening (6PM-10PM)',
    experience: 'Very Experienced (3+ events)',
    status: 'approved',
    tshirtSize: 'L',
    emergencyContact: { name: 'Singh Paramjit', phone: '9123456797', relation: 'Brother' }
  },
  {
    name: 'Preethi Rao',
    contactNumber: '9123456798',
    email: 'preethi.rao@example.com',
    age: 21,
    gender: 'Female',
    assignedRole: 'General Support',
    assignedArea: 'Food Stall Section',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'First Time',
    status: 'registered',
    tshirtSize: 'M',
    emergencyContact: { name: 'Rao Manjunath', phone: '9123456799', relation: 'Father' }
  },
  {
    name: 'Rohan Patel',
    contactNumber: '9123456800',
    email: 'rohan.patel@example.com',
    age: 26,
    gender: 'Male',
    assignedRole: 'Crowd Management',
    assignedArea: 'Not Assigned',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'Experienced (1-2 events)',
    status: 'registered',
    tshirtSize: 'L',
    emergencyContact: { name: 'Patel Dinesh', phone: '9123456801', relation: 'Father' }
  },
  {
    name: 'Sneha Krishnan',
    contactNumber: '9123456802',
    email: 'sneha.k@example.com',
    age: 23,
    gender: 'Female',
    assignedRole: 'Information Desk',
    assignedArea: 'Not Assigned',
    shiftTiming: 'Evening (6PM-10PM)',
    experience: 'First Time',
    status: 'registered',
    tshirtSize: 'S',
    emergencyContact: { name: 'Krishnan Venu', phone: '9123456803', relation: 'Father' }
  },
  {
    name: 'Mahesh Gowda',
    contactNumber: '9123456804',
    email: 'mahesh.gowda@example.com',
    age: 27,
    gender: 'Male',
    assignedRole: 'Parking Management',
    assignedArea: 'Zone B - Four Wheeler Area',
    shiftTiming: 'Full Day',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'XL',
    emergencyContact: { name: 'Gowda Suma', phone: '9123456805', relation: 'Wife' }
  },
  {
    name: 'Anjali Desai',
    contactNumber: '9123456806',
    email: 'anjali.desai@example.com',
    age: 20,
    gender: 'Female',
    assignedRole: 'General Support',
    assignedArea: 'Handicraft Stall Area',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'First Time',
    status: 'approved',
    tshirtSize: 'M',
    emergencyContact: { name: 'Desai Ramesh', phone: '9123456807', relation: 'Father' }
  }
];

const sampleParkingSlots = [
  // Zone A - Two Wheeler
  ...Array.from({ length: 20 }, (_, i) => ({
    slotNumber: `A-${(i + 1).toString().padStart(3, '0')}`,
    zone: 'Zone A',
    vehicleType: 'Two Wheeler',
    status: i < 12 ? 'occupied' : 'available',
    isOccupied: i < 12,
    ...(i < 12 && {
      vehicleNumber: `KA${Math.floor(Math.random() * 100).toString().padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      entryTime: new Date(Date.now() - Math.random() * 3600000 * 5)
    })
  })),
  
  // Zone B - Four Wheeler
  ...Array.from({ length: 15 }, (_, i) => ({
    slotNumber: `B-${(i + 1).toString().padStart(3, '0')}`,
    zone: 'Zone B',
    vehicleType: 'Four Wheeler',
    status: i < 8 ? 'occupied' : 'available',
    isOccupied: i < 8,
    ...(i < 8 && {
      vehicleNumber: `KA${Math.floor(Math.random() * 100).toString().padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      entryTime: new Date(Date.now() - Math.random() * 3600000 * 4)
    })
  })),
  
  // Zone C - Mixed
  ...Array.from({ length: 10 }, (_, i) => ({
    slotNumber: `C-${(i + 1).toString().padStart(3, '0')}`,
    zone: 'Zone C',
    vehicleType: 'Any',
    status: i < 6 ? 'occupied' : 'available',
    isOccupied: i < 6,
    ...(i < 6 && {
      vehicleNumber: `KA${Math.floor(Math.random() * 100).toString().padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      entryTime: new Date(Date.now() - Math.random() * 3600000 * 3)
    })
  })),
  
  // VIP Zone
  ...Array.from({ length: 5 }, (_, i) => ({
    slotNumber: `VIP-${(i + 1).toString().padStart(2, '0')}`,
    zone: 'VIP Zone',
    vehicleType: 'Four Wheeler',
    status: i < 2 ? 'occupied' : 'available',
    isOccupied: i < 2,
    ...(i < 2 && {
      vehicleNumber: `KA${Math.floor(Math.random() * 100).toString().padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      entryTime: new Date(Date.now() - Math.random() * 3600000 * 2)
    })
  }))
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Vendor.deleteMany({});
    await Volunteer.deleteMany({});
    await Parking.deleteMany({});
    console.log('Existing data cleared');

    // Insert sample data
    console.log('Inserting sample vendors...');
    await Vendor.insertMany(sampleVendors);
    console.log(`✅ ${sampleVendors.length} vendors inserted`);

    console.log('Inserting sample volunteers...');
    await Volunteer.insertMany(sampleVolunteers);
    console.log(`✅ ${sampleVolunteers.length} volunteers inserted`);

    console.log('Inserting sample parking slots...');
    await Parking.insertMany(sampleParkingSlots);
    console.log(`✅ ${sampleParkingSlots.length} parking slots inserted`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Vendors: ${sampleVendors.length} (${sampleVendors.filter(v => v.status === 'approved').length} approved, ${sampleVendors.filter(v => v.status === 'pending').length} pending)`);
    console.log(`   Volunteers: ${sampleVolunteers.length} (${sampleVolunteers.filter(v => v.status === 'approved').length} approved, ${sampleVolunteers.filter(v => v.status === 'registered').length} pending)`);
    console.log(`   Parking: ${sampleParkingSlots.length} slots (${sampleParkingSlots.filter(p => p.isOccupied).length} occupied)`);

    await mongoose.connection.close();
    console.log('\n✨ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
