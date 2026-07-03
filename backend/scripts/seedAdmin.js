const User = require('../models/User');
const { isDbConnected } = require('../config/db');

const seedAdmin = async () => {
  try {
    if (!isDbConnected()) {
      console.warn('Admin bootstrap skipped: database is not connected');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn(
        'Admin bootstrap skipped: ADMIN_EMAIL and/or ADMIN_PASSWORD not set in .env'
      );
      return;
    }

    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      // Create new admin user
      const adminUser = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`Admin user created: ${adminEmail} (role: admin)`);
      return;
    }

    if (existing.role !== 'admin') {
      // Promote existing customer to admin
      existing.role = 'admin';
      await existing.save({ validateModifiedOnly: true });
      console.log(`Admin user promoted: ${adminEmail} (role: customer → admin)`);
      return;
    }

    // Already admin, no-op
    console.log(`Admin bootstrap: ${adminEmail} already has role admin`);
  } catch (error) {
    console.error('Error during admin bootstrap:', error.message);
  }
};

module.exports = { seedAdmin };
