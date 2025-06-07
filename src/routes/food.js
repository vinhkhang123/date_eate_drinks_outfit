import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Kết nối lại (nếu chưa kết nối)
if (mongoose.connection.readyState === 0) {
  await mongoose.connect("mongodb://127.0.0.1:27017/date_eat_drinks_outfit");
}

// Khai báo schema trùng với lúc lưu
const sheetSchema = new mongoose.Schema({
  tên: String,
  điểm: String,
});
const SheetModel = mongoose.model("googleSheetData", sheetSchema);

// Route
router.get('/news', async (req, res) => {
  try {
    const data = await SheetModel.find();
    res.render('news', { data });
  } catch (err) {
    res.status(500).send("Lỗi khi lấy dữ liệu từ MongoDB");
  }
});

export default router;
