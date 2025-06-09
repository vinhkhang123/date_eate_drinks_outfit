const SheetData = require('../models/importGoogleSheet');

module.exports = {
  index: async (req, res) => {
    try {
      const { khuvuc } = req.query;

      let query = {};
      if (khuvuc) {
        query.khuvuc = new RegExp(khuvuc, 'i'); // tìm gần đúng, không phân biệt hoa thường
        console.log(khuvuc)
      }

      const data = await SheetData.find(query);
      res.render('news', { googlesheetdata: data, searchValue: khuvuc });
    } catch (err) {
      res.status(500).send('Lỗi khi lấy dữ liệu từ MongoDB');
    }
  }
};
