const mongoose = require('mongoose');
const Item = require('./models/Item'); // adjust path if needed

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://shamithajain04:QcmjFGG8b1oxCPjp@emailfeedback.ehw9h4q.mongodb.net/ecommerce';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB, seeding items...');

    // Clear existing items
    await Item.deleteMany({});

    // Sample items
    const items = [
      { title: 'Red Shirt', category: 'shirt', price: 250, description: 'Cotton red shirt', image: '/images/redshirt.jpeg'},
      { title: 'Black Shirt', category: 'shirt', price: 300, description: 'Black casual shirt', image: '/images/blackshirt.jpeg' },
      { title: 'Yellow Hoodie', category: 'hoodie', price: 500, description: 'Comfortable hoodie', image: '/images/yellow.jpeg' },
      
      { title: 'Blue Jeans', category: 'jeans', price: 400, description: 'Denim jeans', image: '/images/bluejeans.jpeg' },
      { title: 'Light Blue Jeans', category: 'jeans', price: 600, description: 'Denim jeans', image: '/images/lightblue.jpeg' },
      { title: 'Black Jeans', category: 'jeans', price: 800, description: 'Denim jeans', image: '/images/black.jpeg' },
      
  
      { title: 'Sneakers', category: 'shoes', price: 700, description: 'Sporty sneakers', image: '/images/sneakers.jpeg' },
      { title: 'Black Boots', category: 'shoes', price: 1200, description: 'Leather boots', image: '/images/boots.jpeg' },
      
      { title: 'Summer Hat', category: 'accessory', price: 150, description: 'Stylish sun hat', image: '/images/hat.jpeg' },
      
      { title: 'Black Sunglasses', category: 'accessory', price: 300, description: 'UV protection', image: '/images/sunglasses.jpeg' },
      { title: 'Red and Pink Sunglasses', category: 'accessory', price: 550, description: 'UV protection', image: '/images/sungredp.jpeg' },
      { title: 'Yellow Sunglasses', category: 'accessory', price: 500, description: 'UV protection', image: '/images/yellowsun.jpeg' },
      
      { title: 'Blue Dress', category: 'dress', price: 200, description: 'Blue summer dress', image: '/images/bluedress.jpeg' },
      { title: 'Red Dress', category: 'dress', price: 450, description: 'Elegant red dress', image: '/images/reddress.jpeg' },
      { title: 'White Dress', category: 'dress', price: 1250, description: 'Elegant white dress', image: '/images/whitedress.jpeg' },
      
      { title: 'Leather Belt', category: 'accessory', price: 200, description: 'Genuine leather belt', image: '/images/belt.jpeg' },
      { title: 'Metal Belt', category: 'accessory', price: 200, description: 'Genuine metal belt', image: '/images/goldbelt.jpeg' },
      
      { title: 'Green Jacket', category: 'jacket', price: 600, description: 'Winter jacket', image: '/images/jacket.jpeg' },
      { title: 'Red Jacket', category: 'jacket', price: 700, description: 'Stylish jacket', image: '/images/redjacket.jpeg' },
      { title: 'White Jacket', category: 'jacket', price: 1500, description: 'Ethnic jacket', image: '/images/whitejack.jpeg' },
    ];

    await Item.insertMany(items);
    console.log('Seeding complete!');

    mongoose.disconnect();
  })
  .catch(err => console.error('MongoDB connection error:', err));
