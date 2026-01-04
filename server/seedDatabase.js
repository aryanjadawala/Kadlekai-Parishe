import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vendor from './models/Vendor.js';
import Volunteer from './models/Volunteer.js';
import Parking from './models/Parking.js';
import Review from './models/Review.js';
import Report from './models/Report.js';

dotenv.config();

const sampleVendors = [
  {
    name: 'Rajesh Kumar',
    businessName: 'Kumar Peanut Paradise',
    contactNumber: '9876543210',
    email: 'rajesh.kumar@example.com',
    productCategory: 'Groundnuts',
    productPhoto: 'https://images.unsplash.com/photo-1566843797139-f6e25aaebddf?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop',
    productDescription: 'Traditional wooden toys, stuffed toys, and educational games for children',
    status: 'approved',
    stallNumber: 'C-310',
    address: { street: 'Malleshwaram', city: 'Bengaluru', state: 'Karnataka', pincode: '560003' }
  },
  {
    name: 'Manjunath Reddy',
    businessName: 'Karnataka Woodcraft',
    contactNumber: '9876543214',
    email: 'manju.wood@example.com',
    productCategory: 'Wooden Works',
    productPhoto: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1566843797139-f6e25aaebddf?w=400&h=300&fit=crop',
    productDescription: 'Organic groundnuts, peanut butter, and roasted varieties',
    status: 'approved',
    stallNumber: 'A-205',
    address: { street: 'JP Nagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560078' }
  },
  {
    name: 'Kavitha Nair',
    businessName: 'Kerala Snacks Corner',
    contactNumber: '9876543217',
    email: 'kavitha.snacks@example.com',
    productCategory: 'Food',
    productPhoto: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
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
    productPhoto: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    productDescription: 'Designer bangles, hair accessories, and fashion jewelry',
    status: 'approved',
    stallNumber: 'B-115',
    address: { street: 'BTM Layout', city: 'Bengaluru', state: 'Karnataka', pincode: '560076' }
  },
  {
    name: 'Ganesh Bhat',
    businessName: 'Ganesh Puja Items',
    contactNumber: '9876543220',
    email: 'ganesh.puja@example.com',
    productCategory: 'Religious Items',
    productPhoto: 'https://images.unsplash.com/photo-1585334572355-2763c55a894c?w=400&h=300&fit=crop',
    productDescription: 'Incense sticks, religious idols, prayer items, and puja essentials',
    status: 'approved',
    stallNumber: 'E-220',
    address: { street: 'Marathahalli', city: 'Bengaluru', state: 'Karnataka', pincode: '560037' }
  },
  {
    name: 'Shalini Reddy',
    businessName: 'Ethnic Clothing Store',
    contactNumber: '9876543221',
    email: 'shalini.clothing@example.com',
    productCategory: 'Clothing',
    productPhoto: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    productDescription: 'Traditional sarees, kurtas, and ethnic wear for the whole family',
    status: 'approved',
    stallNumber: 'B-310',
    address: { street: 'Whitefield', city: 'Bengaluru', state: 'Karnataka', pincode: '560066' }
  },
  {
    name: 'Mohan Das',
    businessName: 'Das Groundnut Emporium',
    contactNumber: '9876543222',
    email: 'mohan.groundnut@example.com',
    productCategory: 'Groundnuts',
    productPhoto: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&h=300&fit=crop',
    productDescription: 'Premium quality roasted groundnuts, jaggery coated peanuts',
    status: 'approved',
    stallNumber: 'A-150',
    address: { street: 'HSR Layout', city: 'Bengaluru', state: 'Karnataka', pincode: '560102' }
  },
  {
    name: 'Sunita Kulkarni',
    businessName: 'Kulkarni Toy World',
    contactNumber: '9876543223',
    email: 'sunita.toys@example.com',
    productCategory: 'Toys',
    productPhoto: 'https://images.unsplash.com/photo-1587027088918-f3054a8b9a85?w=400&h=300&fit=crop',
    productDescription: 'Colorful plastic toys, action figures, and dolls for kids',
    status: 'approved',
    stallNumber: 'C-405',
    address: { street: 'Yelahanka', city: 'Bengaluru', state: 'Karnataka', pincode: '560064' }
  },
  {
    name: 'Naveen Kumar',
    businessName: 'Naveen Street Food',
    contactNumber: '9876543224',
    email: 'naveen.food@example.com',
    productCategory: 'Food',
    productPhoto: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    productDescription: 'Pav bhaji, bhel puri, sev puri, and authentic Mumbai street food',
    status: 'approved',
    stallNumber: 'C-180',
    address: { street: 'Electronic City', city: 'Bengaluru', state: 'Karnataka', pincode: '560100' }
  },
  {
    name: 'Archana Nambiar',
    businessName: 'Nambiar Handicraft Gallery',
    contactNumber: '9876543225',
    email: 'archana.handicraft@example.com',
    productCategory: 'Handicrafts',
    productPhoto: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop',
    productDescription: 'Traditional terracotta, dhokra art, and handwoven baskets',
    status: 'approved',
    stallNumber: 'F-225',
    address: { street: 'RT Nagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560032' }
  },
  {
    name: 'Prakash Shetty',
    businessName: 'Shetty Wood Carving',
    contactNumber: '9876543226',
    email: 'prakash.wood@example.com',
    productCategory: 'Wooden Works',
    productPhoto: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
    productDescription: 'Intricate wooden carvings, sandalwood artifacts, and religious sculptures',
    status: 'approved',
    stallNumber: 'D-115',
    address: { street: 'Banashankari', city: 'Bengaluru', state: 'Karnataka', pincode: '560070' }
  },
  {
    name: 'Meena Rajan',
    businessName: 'Meena Festive Decor',
    contactNumber: '9876543227',
    email: 'meena.decor@example.com',
    productCategory: 'Decorative Items',
    productPhoto: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=400&h=300&fit=crop',
    productDescription: 'Decorative lamps, wall hangings, and festive ornaments',
    status: 'approved',
    stallNumber: 'E-305',
    address: { street: 'Hebbal', city: 'Bengaluru', state: 'Karnataka', pincode: '560024' }
  },
  {
    name: 'Harish Pai',
    businessName: 'Pai Traditional Sweets',
    contactNumber: '9876543228',
    email: 'harish.sweets@example.com',
    productCategory: 'Food',
    productPhoto: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
    productDescription: 'Mysore pak, jalebi, gulab jamun, and traditional Karnataka sweets',
    status: 'approved',
    stallNumber: 'C-120',
    address: { street: 'Jayanagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560041' }
  },
  {
    name: 'Varalakshmi Devi',
    businessName: 'Vara Bangle House',
    contactNumber: '9876543229',
    email: 'vara.bangles@example.com',
    productCategory: 'Bangles',
    productPhoto: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop',
    productDescription: 'Gold-plated bangles, silk thread bangles, and bridal collections',
    status: 'approved',
    stallNumber: 'B-420',
    address: { street: 'Rajajinagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560010' }
  },
  {
    name: 'Ashok Yadav',
    businessName: 'Ashok Peanut Corner',
    contactNumber: '9876543230',
    email: 'ashok.peanut@example.com',
    productCategory: 'Groundnuts',
    productPhoto: 'https://images.unsplash.com/photo-1600626803825-d1a9427fbf65?w=400&h=300&fit=crop',
    productDescription: 'Salted peanuts, chilli peanuts, and peanut chikki',
    status: 'approved',
    stallNumber: 'A-330',
    address: { street: 'Kengeri', city: 'Bengaluru', state: 'Karnataka', pincode: '560060' }
  },
  {
    name: 'Padma Krishnan',
    businessName: 'Padma Silk Sarees',
    contactNumber: '9876543231',
    email: 'padma.silk@example.com',
    productCategory: 'Clothing',
    productPhoto: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    productDescription: 'Pure silk sarees, Kanchipuram sarees, and designer blouses',
    status: 'approved',
    stallNumber: 'B-150',
    address: { street: 'Malleswaram', city: 'Bengaluru', state: 'Karnataka', pincode: '560003' }
  },
  {
    name: 'Nagesh Murthy',
    businessName: 'Murthy Temple Items',
    contactNumber: '9876543232',
    email: 'nagesh.temple@example.com',
    productCategory: 'Religious Items',
    productPhoto: 'https://images.unsplash.com/photo-1609758415022-0f0d2dcda6f6?w=400&h=300&fit=crop',
    productDescription: 'Brass idols, pooja vessels, camphor, and religious books',
    status: 'approved',
    stallNumber: 'E-410',
    address: { street: 'Basavanagudi', city: 'Bengaluru', state: 'Karnataka', pincode: '560004' }
  },
  {
    name: 'Rekha Desai',
    businessName: 'Desai Kidz Zone',
    contactNumber: '9876543233',
    email: 'rekha.toys@example.com',
    productCategory: 'Toys',
    productPhoto: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    productDescription: 'Remote control cars, board games, and educational toys',
    status: 'approved',
    stallNumber: 'C-520',
    address: { street: 'Koramangala', city: 'Bengaluru', state: 'Karnataka', pincode: '560034' }
  },
  {
    name: 'Shankar Hegde',
    businessName: 'Hegde Nut Products',
    contactNumber: '9876543234',
    email: 'shankar.nuts@example.com',
    productCategory: 'Groundnuts',
    productPhoto: 'https://images.unsplash.com/photo-1599909245988-d0256cc4c743?w=400&h=300&fit=crop',
    productDescription: 'Mixed nuts, dry fruits, and premium groundnut varieties',
    status: 'approved',
    stallNumber: 'A-425',
    address: { street: 'Vijayanagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560040' }
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
    status: 'approved',
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
    status: 'approved',
    tshirtSize: 'S',
    emergencyContact: { name: 'Rao Madhavi', phone: '9123456799', relation: 'Mother' }
  },
  {
    name: 'Raghav Desai',
    contactNumber: '9123456800',
    email: 'raghav.desai@example.com',
    age: 26,
    gender: 'Male',
    assignedRole: 'General Support',
    assignedArea: 'Main Stage Audio/Video',
    shiftTiming: 'Full Day',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'L',
    emergencyContact: { name: 'Desai Anand', phone: '9123456801', relation: 'Father' }
  },
  {
    name: 'Anjali Sharma',
    contactNumber: '9123456802',
    email: 'anjali.sharma@example.com',
    age: 23,
    gender: 'Female',
    assignedRole: 'Information Desk',
    assignedArea: 'Zone B Information Booth',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'First Time',
    status: 'approved',
    tshirtSize: 'M',
    emergencyContact: { name: 'Sharma Rekha', phone: '9123456803', relation: 'Mother' }
  },
  {
    name: 'Sunil Krishnan',
    contactNumber: '9123456804',
    email: 'sunil.krishnan@example.com',
    age: 29,
    gender: 'Male',
    assignedRole: 'Crowd Management',
    assignedArea: 'Food Court Zone',
    shiftTiming: 'Evening (6PM-10PM)',
    experience: 'Very Experienced (3+ events)',
    status: 'approved',
    tshirtSize: 'XL',
    emergencyContact: { name: 'Krishnan Meera', phone: '9123456805', relation: 'Wife' }
  },
  {
    name: 'Neha Patil',
    contactNumber: '9123456806',
    email: 'neha.patil@example.com',
    age: 20,
    gender: 'Female',
    assignedRole: 'General Support',
    assignedArea: 'Vendor Assistance Zone C',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'First Time',
    status: 'approved',
    tshirtSize: 'S',
    emergencyContact: { name: 'Patil Sunita', phone: '9123456807', relation: 'Mother' }
  },
  {
    name: 'Rohit Verma',
    contactNumber: '9123456808',
    email: 'rohit.verma@example.com',
    age: 27,
    gender: 'Male',
    assignedRole: 'Parking Management',
    assignedArea: 'Zone B - Four Wheeler Section',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'L',
    emergencyContact: { name: 'Verma Sanjay', phone: '9123456809', relation: 'Father' }
  },
  {
    name: 'Kavya Bhat',
    contactNumber: '9123456810',
    email: 'kavya.bhat@example.com',
    age: 22,
    gender: 'Female',
    assignedRole: 'Medical Support',
    assignedArea: 'First Aid Station - Zone A',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'M',
    emergencyContact: { name: 'Bhat Ramesh', phone: '9123456811', relation: 'Father' }
  },
  {
    name: 'Arjun Nair',
    contactNumber: '9123456812',
    email: 'arjun.nair@example.com',
    age: 31,
    gender: 'Male',
    assignedRole: 'Security',
    assignedArea: 'Main Entrance Security Check',
    shiftTiming: 'Full Day',
    experience: 'Very Experienced (3+ events)',
    status: 'approved',
    tshirtSize: 'XL',
    emergencyContact: { name: 'Nair Priya', phone: '9123456813', relation: 'Wife' }
  },
  {
    name: 'Pooja Rao',
    contactNumber: '9123456814',
    email: 'pooja.rao@example.com',
    age: 24,
    gender: 'Female',
    assignedRole: 'Information Desk',
    assignedArea: 'Lost and Found Counter',
    shiftTiming: 'Evening (6PM-10PM)',
    experience: 'First Time',
    status: 'approved',
    tshirtSize: 'S',
    emergencyContact: { name: 'Rao Krishna', phone: '9123456815', relation: 'Father' }
  },
  {
    name: 'Manoj Iyer',
    contactNumber: '9123456816',
    email: 'manoj.iyer@example.com',
    age: 28,
    gender: 'Male',
    assignedRole: 'General Support',
    assignedArea: 'Handicraft Zone Assistance',
    shiftTiming: 'Morning (6AM-12PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'L',
    emergencyContact: { name: 'Iyer Lakshmi', phone: '9123456817', relation: 'Mother' }
  },
  {
    name: 'Sneha Kulkarni',
    contactNumber: '9123456818',
    email: 'sneha.kulkarni@example.com',
    age: 25,
    gender: 'Female',
    assignedRole: 'Crowd Management',
    assignedArea: 'Temple Area - Crowd Control',
    shiftTiming: 'Afternoon (12PM-6PM)',
    experience: 'Experienced (1-2 events)',
    status: 'approved',
    tshirtSize: 'M',
    emergencyContact: { name: 'Kulkarni Vijay', phone: '9123456819', relation: 'Father' }
  }
];

// Sample reviews for vendors (will be created after vendors are inserted)
const createSampleReviews = (vendors) => {
  const reviewerNames = [
    'Suresh Kumar', 'Priya Sharma', 'Rahul Verma', 'Anita Desai', 'Vikram Singh',
    'Meena Reddy', 'Karthik Nair', 'Lakshmi Iyer', 'Arjun Rao', 'Divya Menon',
    'Rajesh Patel', 'Kavita Bhat', 'Mohan Das', 'Sneha Kulkarni', 'Harish Pai'
  ];
  
  const reviewComments = {
    5: [
      'Excellent quality! Highly recommended.',
      'Amazing products and great service. Will visit again!',
      'Best in the entire festival. Must visit!',
      'Outstanding quality and very reasonable prices.',
      'Absolutely loved it! Five stars!'
    ],
    4: [
      'Very good quality products. Worth the price.',
      'Great experience. Good variety available.',
      'Nice collection. Friendly vendor.',
      'Good quality, will recommend to friends.',
      'Satisfied with the purchase. Good service.'
    ],
    3: [
      'Average quality. Expected better.',
      'Okay products, nothing special.',
      'Decent but could be better.',
      'Fair pricing, average quality.',
      'Not bad, but room for improvement.'
    ],
    2: [
      'Below expectations. Limited variety.',
      'Overpriced for the quality offered.',
      'Not satisfied with the quality.',
      'Expected much better products.',
      'Disappointing experience.'
    ]
  };

  const reviews = [];
  
  // Add reviews to approved vendors
  vendors.forEach((vendor, index) => {
    if (vendor.status === 'approved') {
      // Each vendor gets 2-5 reviews
      const numReviews = Math.floor(Math.random() * 4) + 2;
      
      for (let i = 0; i < numReviews; i++) {
        const rating = index < 15 ? (Math.random() > 0.3 ? 5 : 4) : (Math.random() > 0.5 ? 4 : 3);
        const reviewerIndex = Math.floor(Math.random() * reviewerNames.length);
        const commentIndex = Math.floor(Math.random() * reviewComments[rating].length);
        
        reviews.push({
          vendor: vendor._id,
          rating,
          comment: reviewComments[rating][commentIndex],
          reviewerName: reviewerNames[reviewerIndex],
          reviewerEmail: `${reviewerNames[reviewerIndex].toLowerCase().replace(' ', '.')}@example.com`,
          status: 'approved',
          isApproved: true,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
        });
      }
    }
  });
  
  return reviews;
};

// Sample reports for vendors
const createSampleReports = (vendors) => {
  const reporterNames = ['Anonymous Visitor', 'Concerned Customer', 'Festival Attendee', 'Local Resident'];
  
  const reports = [
    {
      vendor: vendors[3]._id, // Priya Sharma - Toys
      reportType: 'Quality Issue',
      description: 'Some toys appear to be damaged or of poor quality. Please check the inventory.',
      reporterName: 'Concerned Customer',
      reporterEmail: 'concerned.customer@example.com',
      reporterContact: '9988776655',
      status: 'investigating',
      priority: 'medium',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      vendor: vendors[7]._id, // Kavitha Nair - Food
      reportType: 'Hygiene Issue',
      description: 'Food preparation area could be cleaner. Recommend inspection.',
      reporterName: 'Anonymous Visitor',
      reporterEmail: 'visitor123@example.com',
      reporterContact: '9876123456',
      status: 'resolved',
      priority: 'high',
      adminNotes: 'Vendor warned and made improvements. Hygiene standards now met.',
      resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      vendor: vendors[19]._id, // Varalakshmi - Bangles
      reportType: 'Overcharging',
      description: 'Vendor charged ₹500 for bangles marked at ₹350.',
      reporterName: 'Festival Attendee',
      reporterEmail: 'attendee@example.com',
      reporterContact: '9123123123',
      status: 'pending',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];
  
  return reports;
};

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

    // Clear all existing data
    console.log('Clearing all existing data...');
    await Vendor.deleteMany({});
    await Review.deleteMany({});
    await Report.deleteMany({});
    await Volunteer.deleteMany({});
    await Parking.deleteMany({});
    console.log('All existing data cleared');

    // Insert vendors first (they need to exist for reviews/reports)
    console.log('Inserting sample vendors...');
    const insertedVendors = await Vendor.insertMany(sampleVendors);
    console.log(`✅ ${insertedVendors.length} vendors inserted`);

    // Create and insert reviews
    console.log('Creating sample reviews...');
    const reviews = createSampleReviews(insertedVendors);
    await Review.insertMany(reviews);
    console.log(`✅ ${reviews.length} reviews inserted`);

    // Create and insert reports
    console.log('Creating sample reports...');
    const reports = createSampleReports(insertedVendors);
    await Report.insertMany(reports);
    console.log(`✅ ${reports.length} reports inserted`);

    // Insert volunteers
    console.log('Inserting volunteers...');
    await Volunteer.insertMany(sampleVolunteers);
    console.log(`✅ ${sampleVolunteers.length} volunteers inserted`);

    // Insert parking slots
    console.log('Inserting parking slots...');
    await Parking.insertMany(sampleParkingSlots);
    console.log(`✅ ${sampleParkingSlots.length} parking slots inserted`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Vendors: ${insertedVendors.length} (${insertedVendors.filter(v => v.status === 'approved').length} approved)`);
    console.log(`   Reviews: ${reviews.length} (all auto-approved)`);
    console.log(`   Reports: ${reports.length} (${reports.filter(r => r.status === 'pending').length} pending, ${reports.filter(r => r.status === 'investigating').length} investigating, ${reports.filter(r => r.status === 'resolved').length} resolved)`);
    console.log(`   Volunteers: ${sampleVolunteers.length} (${sampleVolunteers.filter(v => v.status === 'approved').length} approved)`);
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
