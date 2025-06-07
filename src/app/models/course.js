const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
/*const list = new Schema({
  _id: ObjectId,
  nameSong:String,
  nameArt: String ,
  img:  String ,
  
});*/
const list = new Schema({
    _id: ObjectId,
      loai:String,
    ten: String ,
    diaChi: String ,
    gia:String,
    gioMoCua: String
});
module.exports = mongoose.model('lists',list);
//module.exports =  mongoose.model('lists', list);
