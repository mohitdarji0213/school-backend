const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ role: 'admin' });
    if (!existing) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
      await User.create({
        name: 'School Admin',
        email: process.env.ADMIN_EMAIL || 'admin@lbsschool.com',
        password: hash,
        role: 'admin'
      });
      console.log('✅ Admin user seeded');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
};

module.exports = seedAdmin;
