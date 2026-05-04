# LinkedIn Clone - MERN Stack

<div align="center">

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express)

A full-stack LinkedIn clone application built with modern web technologies, featuring user authentication, profile management, real-time post creation, and interactive social features.

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Project Structure](#project-structure) • [API Documentation](#api-documentation) • [Contributing](#contributing)

</div>

---

## Overview

This is a professional-grade LinkedIn clone that demonstrates modern full-stack web development practices. The application includes user authentication, profile customization, post management, and real-time features powered by Socket.io.

## Features

### 🔐 Authentication & Security

- User registration and login with JWT tokens
- Password encryption using bcryptjs
- Secure cookie-based session management
- Protected routes and endpoints

### 👤 User Profile Management

- Customizable user profiles with profile and cover pictures
- Professional headline and location information
- Personal bio/about section
- Profile picture upload via Cloudinary
- User search and discovery

### 📝 Post Management

- Create, read, and manage posts
- Rich post interactions
- Image uploads with Cloudinary integration
- Real-time post updates using Socket.io

### 🔄 Real-Time Features

- Live notifications using Socket.io
- Real-time post updates across connected clients
- Instant user activity tracking

### 🎨 User Experience

- Modern, responsive UI with Tailwind CSS
- Smooth animations with Motion library
- Toast notifications with react-hot-toast
- Icon library with Lucide React
- Mobile-friendly design

---

## Tech Stack

### Frontend

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| React            | 19.2.5  | UI Framework            |
| Vite             | 8.0.10  | Build Tool & Dev Server |
| Tailwind CSS     | 4.2.4   | Styling                 |
| React Router DOM | 7.14.2  | Routing                 |
| Axios            | 1.15.2  | HTTP Client             |
| Socket.io Client | 4.8.3   | Real-time Communication |
| Motion           | 12.38.0 | Animation Library       |
| Lucide React     | 1.14.0  | Icons                   |
| React Hot Toast  | 2.6.0   | Notifications           |

### Backend

| Technology    | Version | Purpose              |
| ------------- | ------- | -------------------- |
| Node.js       | Latest  | Runtime              |
| Express       | 5.2.1   | Web Framework        |
| MongoDB       | Latest  | Database             |
| Mongoose      | 9.6.0   | ODM                  |
| Socket.io     | 4.8.3   | Real-time Features   |
| JWT           | 9.0.3   | Authentication       |
| Bcryptjs      | 3.0.3   | Password Hashing     |
| Multer        | 2.1.1   | File Upload          |
| Cloudinary    | 2.10.0  | Cloud Storage        |
| CORS          | 2.8.6   | Cross-Origin Support |
| Cookie Parser | 1.4.7   | Cookie Handling      |

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Cloudinary account (for image uploads)

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend directory

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in the frontend directory

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

### Running Both Simultaneously

Open two terminals and run:

- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

---

## Project Structure

```
LinkedIn Clone
├── backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   └── mongodb.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authControllers.js     # Auth logic
│   │   ├── postControllers.js     # Post management
│   │   └── userControllers.js     # User management
│   ├── middlewares/
│   │   ├── isAuth.js              # Auth verification
│   │   └── multer.js              # File upload config
│   ├── models/
│   │   ├── postModel.js           # Post schema
│   │   └── userModel.js           # User schema
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   ├── postRoutes.js          # Post endpoints
│   │   └── userRoutes.js          # User endpoints
│   ├── public/                    # Static files
│   ├── .env                       # Environment variables
│   ├── index.js                   # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AllPosts.jsx       # Posts feed
│   │   │   ├── CreatePostPopup.jsx # Post creation
│   │   │   ├── Navbar.jsx         # Navigation
│   │   │   └── Post.jsx           # Post component
│   │   ├── context/
│   │   │   ├── AuthContextProvider.jsx    # Auth state
│   │   │   ├── PostContextProvider.jsx    # Posts state
│   │   │   └── UserContextProvider.jsx    # User state
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Signup.jsx         # Signup page
│   │   │   └── UpdateProfile.jsx  # Profile update
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── public/                    # Static assets
│   ├── .env                       # Environment variables
│   ├── vite.config.js             # Vite configuration
│   ├── eslint.config.js           # ESLint config
│   └── package.json
│
└── readme.md                      # This file
```

---

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### User Endpoints

#### Get User Profile

```http
GET /api/user/:userId
Authorization: Bearer <token>
```

#### Update User Profile

```http
PUT /api/user/:userId
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "firstName": "John",
  "lastName": "Doe",
  "headline": "Software Engineer",
  "location": "New York, USA",
  "about": "Passionate developer...",
  "profilePicture": <file>,
  "coverPicture": <file>
}
```

### Post Endpoints

#### Get All Posts

```http
GET /api/post
Authorization: Bearer <token>
```

#### Create Post

```http
POST /api/post
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "content": "Post content here",
  "image": <file>
}
```

#### Update Post

```http
PUT /api/post/:postId
Authorization: Bearer <token>

{
  "content": "Updated content"
}
```

#### Delete Post

```http
DELETE /api/post/:postId
Authorization: Bearer <token>
```

---

## Usage

### For Development

1. **Start both servers** as shown in the installation section
2. **Create an account** on the signup page
3. **Log in** with your credentials
4. **Update your profile** with profile picture and information
5. **Create posts** using the post creation feature
6. **View feed** with all posts in real-time

### Build for Production

**Frontend:**

```bash
cd frontend
npm run build
```

**Backend:**
Ensure `NODE_ENV=production` in `.env`

---

## Features in Detail

### User Authentication

- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- Session persistence with cookies

### Profile Management

- Upload and manage profile pictures via Cloudinary
- Set professional headline and location
- Add personal bio
- Cover image customization

### Post Management

- Create posts with text and images
- Edit and delete own posts
- View posts from all users
- Real-time post updates

### Real-Time Features

- Socket.io integration for live updates
- Instant notifications
- Real-time user activity

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)

```env
VITE_SERVER_URL=http://localhost:5000
```

---

## Deployment

### Backend Deployment (Vercel, Render, or Railway)

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Connect frontend folder to Vercel
2. Set `VITE_SERVER_URL` to production backend URL
3. Deploy

---

## Performance Optimization

- Lazy loading components in React
- Image optimization with Cloudinary
- Efficient database queries with Mongoose
- Minified CSS with Tailwind
- Code splitting with Vite

---

## Security Best Practices

✅ JWT token-based authentication  
✅ Password hashing with bcryptjs  
✅ CORS enabled for secure cross-origin requests  
✅ Protected API endpoints  
✅ Environment variable protection  
✅ Input validation

---

## Common Issues & Solutions

### MongoDB Connection Error

- Check MongoDB URI in `.env`
- Ensure MongoDB service is running
- Verify network access in MongoDB Atlas

### Cloudinary Upload Fails

- Verify Cloudinary credentials
- Check API key and secret
- Ensure cloud name is correct

### CORS Issues

- Update frontend URL in backend CORS config
- Ensure credentials: true is set

### Socket.io Not Working

- Check if both client and server are running
- Verify socket.io versions match
- Check browser console for errors

---

## Git Workflow

```bash
# Clone repository
git clone <repository-url>

# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/feature-name

# Create Pull Request
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ syntax
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic

---

## Future Enhancements

- [ ] User follow/unfollow system
- [ ] Like and comment functionality
- [ ] Direct messaging
- [ ] Notifications dashboard
- [ ] User recommendations
- [ ] Search functionality
- [ ] Dark mode support
- [ ] Advanced filtering and sorting

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Contact & Support

**Developer:** Abubakar Afzal  
**Email:** abubakarafzal0101@gmail.com  
**GitHub:** [github.com/abubakarafzal](https://github.com/abubakarafzal0101)  
**LinkedIn:** [linkedin.com/in/abubakar-afzal-737889407](https://linkedin.com/in/abubakar-afzal-737889407)  
**Location:** Bahawalnadar, Punjab, Pakistan

---

## Acknowledgments

- React team for the amazing framework
- MongoDB for the robust database
- Cloudinary for cloud storage
- Socket.io for real-time capabilities
- Tailwind CSS for utility-first styling

---

<div align="center">

**Made with ❤️ by Abubakar Afzal**

⭐ If you found this project helpful, please give it a star!

</div>
