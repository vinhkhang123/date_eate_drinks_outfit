const mongoose = require('mongoose');
require('dotenv').config();

// ⚙️ URI local & Atlas
const LOCAL_URI = 'mongodb://127.0.0.1:27017/date_eat_drinks_outfit';
const ATLAS_URI = process.env.MONGO_URI; // lấy từ .env

// ⚙️ Schema giống nhau ở cả 2 nơi
const sheetSchema = new mongoose.Schema({
  khuvuc: String,
  muc: String,
  thoigian: String,
  quan: String,
  diachi: String,
  mieuta: String,
  giatien: String,
  bosung: String,
});

// B1: Kết nối local MongoDB
const localConn = mongoose.createConnection(LOCAL_URI);
const LocalModel = localConn.model('googlesheetdatas', sheetSchema);

// B2: Kết nối MongoDB Atlas
const atlasConn = mongoose.createConnection(ATLAS_URI);
const AtlasModel = atlasConn.model('googlesheetdatas', sheetSchema);

// Hàm chuyển dữ liệu
async function migrate() {
  try {
    await localConn.asPromise();
    await atlasConn.asPromise();

    console.log("✅ Đã kết nối cả local và Atlas");

    const data = await LocalModel.find({});
    console.log(`📦 Tìm thấy ${data.length} bản ghi`);

    await AtlasModel.insertMany(data);
    console.log("✅ Đã chuyển dữ liệu sang MongoDB Atlas");

  } catch (err) {
    console.error("❌ Lỗi khi chuyển:", err.message);
  } finally {
    await localConn.close();
    await atlasConn.close();
  }
}

migrate();
