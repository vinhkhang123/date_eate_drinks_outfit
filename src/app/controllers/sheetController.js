const SheetData = require('../models/datasheet.js');

module.exports = {
  index: async (req, res) => {
    try {
      const { khuvuc } = req.query;

      let query = {};
      if (khuvuc && khuvuc.trim() !== '') {
        query.khuvuc = new RegExp(khuvuc, 'i');
      //  console.log('🔍 Giá trị tìm kiếm:', khuvuc);
      

      }
      // kiểm tra tất cả khu vực
     // const allData = await SheetData.find();
      //console.log("📊 Tất cả khu vực:", allData.map(d => d.khuvuc));
      const data = await SheetData.find(query).lean();
      // 🟢 Đặt ở đây

      res.render('food', { data, searchValue: khuvuc });
    } catch (err) {
      console.error('❌ Lỗi truy vấn MongoDB:', err.message);
      res.status(500).send('Lỗi khi lấy dữ liệu từ MongoDB');
    }
  }
};
