# FilmFlare 2.0

A full-stack movie website built with React.js, Tailwind CSS, and MongoDB. FilmFlare allows users to explore movies, view details, watch trailers, and read blog posts, while admins can manage content through a protected admin panel.

## 🚀 Features

### User Features
- **Home Page**: Hero section with featured movie and trending movies grid
- **Movies Page**: Browse all movies with search, genre, and year filters
- **Movie Details**: Full movie information with embedded YouTube trailers
- **Blog/News**: Read movie news and articles
- **User Ratings**: Rate movies (1-10 scale)
- **Favorites**: Save favorite movies using localStorage
- **About & Contact**: Learn about the site and contact form

### Admin Features
- **Protected Admin Panel**: JWT-based authentication
- **Movie Management**: Add, edit, and delete movies
- **Blog Management**: Create and manage blog posts
- **Image Uploads**: Upload movie posters and blog cover images

## 🛠️ Tech Stack

### Frontend
- React.js (JSX)
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Uploads)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FilmFlare-2.0
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/FilmFlare
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/FilmFlare
   ```

5. **Create uploads directory**
   ```bash
   mkdir server/uploads
   ```

## 🚀 Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

1. Build the React app:
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. Set `NODE_ENV=production` in your `.env` file

3. Start the server:
   ```bash
   npm run server
   ```

## 👤 Admin Setup

1. **Create an admin account**

   You can create an admin account by making a POST request to `/api/auth/register`:
   
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"yourpassword"}'
   ```

   Or use a tool like Postman to make the request.

2. **Login**
   - Navigate to http://localhost:3000/admin/login
   - Enter your admin email and password
   - You'll be redirected to the admin dashboard

## 📁 Project Structure

```
FilmFlare-2.0/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── uploads/            # Uploaded images
│   └── index.js
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration (for initial setup)

### Movies
- `GET /api/movies` - Get all movies (supports ?search, ?genre, ?year, ?sort)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Add movie (protected)
- `PUT /api/movies/:id` - Update movie (protected)
- `DELETE /api/movies/:id` - Delete movie (protected)
- `POST /api/movies/:id/rate` - Rate a movie

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get blog post by ID
- `POST /api/blog` - Create blog post (protected)
- `PUT /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages

## 🎨 Features in Detail

### Movie Management
- Add movies with title, release date, duration, genres, description, poster image, and YouTube trailer link
- Edit existing movies
- Delete movies (removes associated images)
- Search and filter by genre and year
- User ratings system

### Blog Management
- Create blog posts with title, excerpt, content, author, and cover image
- Edit and delete posts
- Minimum 200 characters for descriptions/content (AdSense-ready)

### Security
- JWT-based authentication for admin routes
- Password hashing with bcrypt
- Protected API endpoints
- Token expiration (7 days)

## 📝 AdSense-Ready Features

- Original written descriptions (200+ words per movie)
- Blog posts with substantial content (200+ words)
- Privacy Policy page
- Disclaimer page
- About page
- Contact page
- SEO-friendly structure

## 🚢 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project to Vercel
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm run server`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT` (usually auto-assigned)

### MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGODB_URI` in your backend environment variables

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local)
- Check your connection string in `.env`
- Verify network access in MongoDB Atlas

### Image Upload Issues
- Ensure `server/uploads` directory exists
- Check file permissions
- Verify file size limits (5MB max)

### CORS Issues
- Backend CORS is configured for development
- Update CORS settings for production domains

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, use the contact form on the website or open an issue on GitHub.

---

Built with ❤️ using React, Express, and MongoDB
