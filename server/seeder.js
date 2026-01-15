import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./model/product.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedProducts = async () => {
  const products = [
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with long battery life.",
      price: 25,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Alice", rating: 5, comment: "Excellent mouse!" },
        { user: new mongoose.Types.ObjectId(), name: "Bob", rating: 4, comment: "Good value for money." }
      ]
    },
    {
      name: "Bluetooth Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 75,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Charlie", rating: 4, comment: "Very comfortable." }
      ]
    },
    {
      name: "Running Shoes",
      description: "Lightweight running shoes for daily workouts.",
      price: 50,
      category: "Sports",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "David", rating: 5, comment: "Love the comfort!" },
        { user: new mongoose.Types.ObjectId(), name: "Eva", rating: 4, comment: "Nice shoes but a bit pricey." }
      ]
    },
    {
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor and GPS.",
      price: 120,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Frank", rating: 5, comment: "Tracks everything perfectly." }
      ]
    },
    {
      name: "Yoga Mat",
      description: "Non-slip yoga mat with carrying strap.",
      price: 20,
      category: "Sports",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Grace", rating: 5, comment: "Perfect thickness." }
      ]
    },
    {
      name: "Laptop Backpack",
      description: "Water-resistant backpack for laptops up to 15 inches.",
      price: 40,
      category: "Accessories",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Hannah", rating: 4, comment: "Spacious and sturdy." }
      ]
    },
    {
      name: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness.",
      price: 30,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Ian", rating: 4, comment: "Bright and energy-saving." }
      ]
    },
    {
      name: "Coffee Maker",
      description: "Automatic coffee machine with milk frother.",
      price: 150,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Jack", rating: 5, comment: "Great taste and easy to clean." }
      ]
    },
    {
      name: "Gaming Keyboard",
      description: "Mechanical keyboard with RGB backlight.",
      price: 80,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Kate", rating: 5, comment: "Perfect for gaming!" }
      ]
    },
    {
      name: "Electric Kettle",
      description: "Fast boiling electric kettle with auto shut-off.",
      price: 35,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Leo", rating: 4, comment: "Boils quickly and safe." }
      ]
    },
    {
      name: "Portable Charger",
      description: "10000mAh power bank with fast charging.",
      price: 25,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Mia", rating: 5, comment: "Very handy for travel." }
      ]
    },
    {
      name: "Sunglasses",
      description: "Polarized sunglasses with UV protection.",
      price: 15,
      category: "Accessories",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Nina", rating: 4, comment: "Stylish and affordable." }
      ]
    },
    {
      name: "Backpack Water Bottle Holder",
      description: "Flexible water bottle holder for backpacks.",
      price: 10,
      category: "Accessories",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Oscar", rating: 4, comment: "Useful for hiking." }
      ]
    },
    {
      name: "Electric Toothbrush",
      description: "Rechargeable toothbrush with timer.",
      price: 50,
      category: "Personal Care",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Paula", rating: 5, comment: "Teeth feel clean!" }
      ]
    },
    {
      name: "Hair Dryer",
      description: "Fast-drying hair dryer with cool shot function.",
      price: 40,
      category: "Personal Care",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Quinn", rating: 4, comment: "Good performance." }
      ]
    },
    {
      name: "Electric Shaver",
      description: "Cordless shaver with washable head.",
      price: 60,
      category: "Personal Care",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Ryan", rating: 5, comment: "Smooth shave every time." }
      ]
    },
    {
      name: "Fitness Tracker Band",
      description: "Steps and heart rate tracker with sleep monitor.",
      price: 35,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Sophia", rating: 4, comment: "Motivates me to walk more." }
      ]
    },
    {
      name: "Camping Tent",
      description: "Lightweight 2-person waterproof tent.",
      price: 100,
      category: "Sports",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Tom", rating: 5, comment: "Easy to set up and strong." }
      ]
    },
    {
      name: "Cookware Set",
      description: "Non-stick 10-piece cookware set.",
      price: 120,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Uma", rating: 5, comment: "High quality and durable." }
      ]
    },
    {
      name: "Smartphone Stand",
      description: "Adjustable phone stand for desk or bed.",
      price: 12,
      category: "Accessories",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Victor", rating: 4, comment: "Convenient and sturdy." }
      ]
    },
    {
      name: "Wireless Charger",
      description: "Fast wireless charging pad for smartphones.",
      price: 30,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Wendy", rating: 5, comment: "Charges quickly and safe." }
      ]
    },
    {
      name: "LED Strip Lights",
      description: "RGB LED lights with remote control.",
      price: 25,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Xander", rating: 5, comment: "Fun and bright!" }
      ]
    },
    {
      name: "Gaming Chair",
      description: "Ergonomic chair with adjustable height.",
      price: 150,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Yara", rating: 5, comment: "Super comfortable." }
      ]
    },
    {
      name: "Tablet Case",
      description: "Protective case for 10-inch tablets.",
      price: 20,
      category: "Accessories",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Zack", rating: 4, comment: "Fits perfectly." }
      ]
    },
    {
      name: "Wireless Earbuds",
      description: "Bluetooth earbuds with charging case.",
      price: 50,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Amy", rating: 5, comment: "Sound is amazing!" }
      ]
    },
    {
      name: "Portable Speaker",
      description: "Bluetooth speaker with deep bass.",
      price: 40,
      category: "Electronics",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Ben", rating: 5, comment: "Great sound for parties." }
      ]
    },
    {
      name: "Desk Organizer",
      description: "Multi-functional desk organizer for office supplies.",
      price: 18,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Clara", rating: 4, comment: "Keeps desk tidy." }
      ]
    },
    {
      name: "Microwave Oven",
      description: "900W microwave with multiple cooking modes.",
      price: 100,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Dan", rating: 5, comment: "Heats quickly and evenly." }
      ]
    },
    {
      name: "Electric Grill",
      description: "Indoor electric grill for meat and vegetables.",
      price: 70,
      category: "Home",
      reviews: [
        { user: new mongoose.Types.ObjectId(), name: "Ella", rating: 5, comment: "Easy to use and clean." }
      ]
    }
  ];

  // calculate averageRating and numReviews for each product
  products.forEach(p => {
    if (p.reviews.length > 0) {
      const total = p.reviews.reduce((acc, r) => acc + r.rating, 0);
      p.averageRating = total / p.reviews.length;
      p.numReviews = p.reviews.length;
    }
  });

  try {
    await Product.deleteMany(); // optional: clear existing
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedProducts);
