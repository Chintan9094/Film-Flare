const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FilmFlare';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Seed admin user (for initial setup)
const Admin = require('./models/Admin');
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
      // Ensure desired password (idempotent: updates if different)
      admin.password = password;
      await admin.save();
      console.log(`Seed admin ensured/updated: ${email}`);
    }
  } catch (e) {
    console.error('Failed to seed admin:', e);
  }
}
ensureSeedAdmin();

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

