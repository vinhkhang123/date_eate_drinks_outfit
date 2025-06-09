const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const db = require('./Config/db');
const route = require('./routes');

const app = express();
const port = 3000;

// Kết nối DB
db.KetNoi();

// Static + Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine('hbs', engine({
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// Routes
route(app);

// Start server
app.listen(port, () => {
  console.log(`✅ Server chạy tại http://localhost:${port}`);
});
