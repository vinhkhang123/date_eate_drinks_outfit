import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// URL Google Sheet export dạng CSV
const CSV_URL = "https://docs.google.com/spreadsheets/d/1hVo-4y5NNgUULq940WwDgr2gjCgwrJZj0mmMo8FJl-A/export?format=csv&gid=1050285890";

// Kết nối MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/date_eat_drinks_outfit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("✅ Đã kết nối MongoDB");

// Schema cập nhật
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

const SheetData = mongoose.model("googleSheetData", sheetSchema);

// Hàm import
export async function importData() {
  try {
    const response = await fetch(CSV_URL);
    const text = await response.text();

    const lines = text.split("\n");
    // Bỏ qua header (dòng 0)
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");

      return {
        khuvuc: values[0]?.trim(),
        muc: values[1]?.trim(),
        thoigian: values[2]?.trim(),
        quan: values[3]?.trim(),
        diachi: values[4]?.trim(),
        mieuta: values[5]?.trim(),
        giatien: values[6]?.trim(),
        bosung: values[7]?.trim(),
      };
    }).filter(item => item.quan);

    await SheetData.deleteMany();
    await SheetData.insertMany(data);

    console.log("✅ Import thành công");
  } catch (err) {
    console.error("❌ Lỗi import:", err);
  } finally {
    await mongoose.connection.close();
  }
}

// Nếu chạy trực tiếp file này, thì chạy importData luôn
if (process.argv[1].endsWith('importgooglesheet.js')) {
  await importData();
}
