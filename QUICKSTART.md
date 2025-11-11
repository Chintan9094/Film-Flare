# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Set Up Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/FilmFlare
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/FilmFlare
```

### Step 3: Start MongoDB

**Local MongoDB:**
- Make sure MongoDB is running on your system
- Default connection: `mongodb://localhost:27017/FilmFlare`

**MongoDB Atlas (Cloud):**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Create Admin Account

Start the backend server:
```bash
npm run server
```

Then create an admin account using one of these methods:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
```

**Using Postman:**
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

### Step 5: Run the Application

```bash
# Run both frontend and backend
npm run dev
```

Or separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client
npm start
```

### Step 6: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Admin Login:** http://localhost:3000/admin/login

### Step 7: Add Your First Movie

1. Login at http://localhost:3000/admin/login
2. Go to Admin Dashboard
3. Click "Add New Movie"
4. Fill in the form:
   - Title
   - Release Date
   - Duration (e.g., "2h 30m")
   - Genre (comma-separated, e.g., "Action, Drama")
   - Description (minimum 200 characters)
   - Poster Image (upload a file)
   - YouTube Trailer Link
5. Click "Add Movie"

### Step 8: Add Your First Blog Post

1. In Admin Dashboard, switch to "Blog Posts" tab
2. Click "Add New Blog Post"
3. Fill in the form:
   - Title
   - Excerpt (short summary)
   - Author (optional, defaults to "FilmFlare Team")
   - Cover Image (upload a file)
   - Content (minimum 200 characters)
4. Click "Add Post"

## 🎯 Next Steps

- Add more movies and blog posts
- Customize the styling in `client/tailwind.config.js`
- Update the About page with your information
- Configure contact form email (if using EmailJS)
- Deploy to production (see README.md)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas, check network access settings

**Port Already in Use:**
- Change `PORT` in `.env` for backend
- Change port in `client/package.json` scripts for frontend

**Image Upload Fails:**
- Ensure `server/uploads` directory exists
- Check file permissions
- Verify file size (max 5MB)

**CORS Errors:**
- Backend CORS is configured for development
- Update CORS settings in `server/index.js` for production

## 📚 Need Help?

- Check the full README.md for detailed documentation
- Review API endpoints in README.md
- Check server logs for error messages

Happy coding! 🎬

