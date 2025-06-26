const mongoose = require("mongoose");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");
require("dotenv").config();

// Lấy từ biến môi trường
const MONGO_URI = process.env.MONGO_URI;
const CSV_URL = process.env.CSV_URL;

if (!MONGO_URI || !CSV_URL) {
  console.error("❌ Thiếu MONGO_URI hoặc CSV_URL trong .env");
  process.exit(1);
}

// Định nghĩa schema
const sheetSchema = new mongoose.Schema({
  stt: String,
  khuvuc: String,
  muc: String,
  thoigian: String,
  quan: String,
  diachi: String,
  mieuta: String,
  giatien: String,
  bosung: String,
});

const SheetData = mongoose.model("googleSheetData", sheetSchema);

// Hàm import dữ liệu
async function importData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB");

    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    // Tách từng dòng
    const lines = csvText.split('\n');

    // Tìm dòng đầu tiên chứa tiêu đề thật
    let headerIndex = lines.findIndex(line => line.includes('STT') && line.includes('KHU VỰC'));
    if (headerIndex === -1) {
      throw new Error('❌ Không tìm thấy dòng tiêu đề hợp lệ trong CSV');
    }

    // Cắt phần CSV từ dòng tiêu đề trở đi
    const validCsv = lines.slice(headerIndex).join('\n');

    // Parse từ đoạn đó
    const records = parse(validCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    let lastKnownKhuvuc = "";
    
    const cleaned = records.map((row) => {
      const stt = row["STT"] || "";
      const khuvuc = row["KHU VỰC"]?.trim();
      if (khuvuc) lastKnownKhuvuc = khuvuc;

      return {
        stt,
        khuvuc: lastKnownKhuvuc,
        muc: row["MỤC"] || "",
        thoigian: row["THỜI GIAN"] || "",
        quan: row["QUÁN"] || "",
        diachi: row["ĐỊA CHỈ"] || "",
        mieuta: row["MIÊU TẢ"] || "",
        giatien: row["GIÁ TIỀN"] || "",
        bosung: row["BỔ SUNG"] || "",
      };
    }).filter((item) => item.quan);

    await SheetData.deleteMany();
    await SheetData.insertMany(cleaned);

    console.log("✅ Import thành công:", cleaned.length, "dòng");
  } catch (err) {
    console.error("❌ Lỗi import:", err);
  } finally {
    await mongoose.connection.close();
  }
}

// Nếu chạy trực tiếp file này thì thực hiện import luôn
if (require.main === module) {
  importData();
}

module.exports = importData;
