const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../server/app');
const Admin = require('../server/models/Admin');

dotenv.config();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FilmFlare';
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  await ensureSeedAdmin();
}

async function ensureSeedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'chintan@gmail.com';
    const password = process.env.ADMIN_PASSWORD || '9094';

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({ email, password });
      await admin.save();
      console.log(`Seed admin created: ${email}`);
    } else {
      admin.password = password;
      await admin.save();
      console.log(`Seed admin ensured/updated: ${email}`);
    }
  } catch (e) {
    console.error('Failed to seed admin:', e);
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  await connectDB();
  return handler(req, res);
};

// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'server', 'uploads')));

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FilmFlare';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import routes from your server folder
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/movies', require('../server/routes/movies'));
app.use('/api/blog', require('../server/routes/blog'));
app.use('/api/contact', require('../server/routes/contact'));

// Seed admin (optional same as your server/index.js)
const Admin = require('../server/models/Admin');
async function ensureSeedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'chintan@gmail.com';
    const password = process.env.ADMIN_PASSWORD || '9094';
    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({ email, password });
      await admin.save();
      console.log(`👑 Seed admin created: ${email}`);
    } else {
      admin.password = password;
      await admin.save();
      console.log(`🔁 Admin updated: ${email}`);
    }
  } catch (err) {
    console.error('Admin seed error:', err);
  }
}
ensureSeedAdmin();

// Export as serverless function
module.exports = serverless(app);
