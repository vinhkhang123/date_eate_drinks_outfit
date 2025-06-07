const express = require('express');
const path = require('path')
//const morgan = require('morgan')
const { engine } = require('express-handlebars');
const { execPath } = require('process');
const db= require('./Config/db')
//database
//db.connect();
db.KetNoi()
const app = express();
const port = 3000;
const route = require('./routes')
app.use(express.static(path.join(__dirname,'public')))
app.engine('hbs', engine({
    extname: '.hbs'
}
    
));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resource','views'))
app.listen(port,() => console.log(`app nghe o port http://localhost:${port}`))
route(app)

app.use(express(express.urlencoded))