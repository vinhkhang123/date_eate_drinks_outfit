const list = require('../models/course')

   
class siteControllers {
    // GET news
    
  async  index(req,res) {

   // const aaa= await list.find({})
     
        //res.json(aaa); 
           
        list.find({})
           .lean()
           .then  (list => {
            // biến thể khác khi không load được dữ liệu thay vì dùng lean()
            // ít an toàn hơn
           // list = list.map(list => list.toObject() )
           
              res.render('home',{list})
              
           } )
       
    }
}
//module.exports = new AdminController();
module.exports = new siteControllers