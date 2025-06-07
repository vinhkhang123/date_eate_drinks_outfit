const mongoose = require('mongoose');

/*async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/music_app_dev', { 
          serverSelectionTimeoutMS: 30000,
        });
        console.log('Kết nối thành công');
      } catch (error) {
        console.log('Kết nối thất bại:', error);
        console.error('Chi tiết:', error.message);
      }
}
module.exports = {connect}*/
async function KetNoi() {
  try {
      await mongoose.connect('mongodb://127.0.0.1:27017/date_eat_drinks_outfit', { 
        serverSelectionTimeoutMS: 30000,
      });
      console.log('Kết nối thành công nha');
    } catch (error) {
      console.log('Kết nối thất bại:', error);
      console.error('Chi tiết:', error.message);
    }
}
module.exports ={KetNoi}
//module.exports = {connect}