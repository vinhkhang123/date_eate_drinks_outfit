const newsRouter = require('./news')
const siteRouter = require('./site')
const foodRouter = require('./food')
function route(app){
    app.use('/food',foodRouter);
    app.use('/news',newsRouter);
    app.use('/',siteRouter)
    
    
}


module.exports =route