const SheetData = require('../models/importGoogleSheet');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await SheetData.find();
      res.render('news', { googlesheetdata: data });
      
    } catch (err) {
      res.status(500).send('Lỗi khi lấy dữ liệu');
    }
  }
};
