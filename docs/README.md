# 🎬 Movie Database Application

A beautiful and modern movie database application with a sleek glassmorphism UI design.

## ✨ Features

- **Add Movies**: Easily add new movies with name, producer, and release date
- **Smart Search**: Real-time search functionality by movie name or producer
- **Modern UI**: Beautiful glassmorphism design with gradients and animations
- **Responsive**: Works perfectly on desktop and mobile devices
- **Fast**: Single-page application with instant updates

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript with modern design
- **Backend**: Node.js with Express
- **Database**: SQLite with Prisma ORM
- **UI Design**: Glassmorphism with gradient backgrounds and animations

## 🚀 Getting Started

### Development
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:9001`

### Production Deployment

1. **Install dependencies:**
   ```bash
   npm install --production
   ```

2. **Set up database:**
   ```bash
   npm run setup
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

4. **Environment Variables:**
   - Copy `.env.example` to `.env` and adjust values
   - `PORT`: Server port (default: 9001)
   - `NODE_ENV`: Set to `production`

## 📖 Usage

1. **Add Movies**: Use the form on the left to add new movies to your collection
2. **Search Movies**: Use the search bar on the right to find specific movies
3. **View Collection**: Browse your movie collection in the beautiful card grid below

## 🔗 API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies?search=term` - Search movies
- `POST /api/movies` - Add a new movie

## 🗄️ Database Schema

The application uses a single `Movie` model:
- `id` - Auto-increment primary key
- `name` - Movie title
- `producer` - Producer name
- `releaseDate` - Release date
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🎨 Design Features

- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradient theme
- **Smooth Animations**: Hover effects and fade-in animations
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Grid**: Adaptive layout for different screen sizes