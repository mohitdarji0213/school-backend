const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');



dotenv.config();

const app = express();




// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true  // Cookie bhejne ke liye ZARURI hai
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookies parse karne ke liye
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/events', require('./routes/events'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/results', require('./routes/results'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/achievements', require('./routes/achievements'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LBS School API Running', timestamp: new Date() });
});

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    require('./config/seedAdmin');
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 LBS School Server running on port ${PORT}`);
});