const mongoose = require('mongoose');

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

const SheetData = mongoose.model('googleSheetData', sheetSchema);

module.exports = SheetData;