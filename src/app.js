const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const dotenv = require('dotenv'); // Load .env
dotenv.config();

const db = require('./Config/db'); // 🔁 Đã sửa tên file từ ./Config/db
const route = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Kết nối MongoDB Atlas (hoặc local nếu bạn cấu hình fallback)
db.connectDB();

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
