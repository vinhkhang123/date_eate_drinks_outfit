require('dotenv').config();
const mongoose = require('mongoose');


async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ Không tìm thấy MONGO_URI trong file .env");
    console.log("📦 DEBUG MONGO_URI =", process.env.MONGO_URI); 
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ Kết nối MongoDB thất bại:", err.message);
  }
}

module.exports = { connectDB };
