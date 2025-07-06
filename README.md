# 🎬 Movie Database Application (Two-Tier Architecture)

A beautiful and modern movie database application with a sleek glassmorphism UI design, built with a two-tier architecture using MySQL database.

## ✨ Features

- **Add Movies**: Easily add new movies with name, producer, and release date
- **Smart Search**: Real-time search functionality by movie name or producer
- **Modern UI**: Beautiful glassmorphism design with gradients and animations
- **Responsive**: Works perfectly on desktop and mobile devices
- **Fast**: Single-page application with instant updates

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript with modern design
- **Backend**: Node.js with Express
- **Database**: MySQL with Prisma ORM
- **UI Design**: Glassmorphism with gradient backgrounds and animations
- **Architecture**: Two-tier (Application + Database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)

### MySQL Installation
**macOS (using Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows:**
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

### Development Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Database:**
   - Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/moviesdb"
   ```
   - Replace `username` and `password` with your MySQL credentials

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:9001`

### Production Deployment

1. **Install dependencies:**
   ```bash
   npm install --production
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/moviesdb"
   PORT=9001
   NODE_ENV=production
   ```

3. **Set up database:**
   ```bash
   npm run setup
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📖 Usage

1. **Add Movies**: Use the form on the left to add new movies to your collection
2. **Search Movies**: Use the search bar on the right to find specific movies
3. **View Collection**: Browse your movie collection in the beautiful card grid below

## 🔗 API Endpoints

- `GET /api/movies` - Get all movies
- `GET /api/movies?search=term` - Search movies
- `POST /api/movies` - Add a new movie

## 🗄️ Database Schema

The application uses MySQL with a single `Movie` table:
- `id` - Auto-increment primary key (INT)
- `name` - Movie title (VARCHAR)
- `producer` - Producer name (VARCHAR)
- `releaseDate` - Release date (DATETIME)
- `createdAt` - Creation timestamp (DATETIME)
- `updatedAt` - Last update timestamp (DATETIME)

### Database Management
**Connect to MySQL:**
```bash
mysql -u root -p moviesdb
```

**View all movies:**
```sql
SELECT * FROM Movie;
```

**Count movies:**
```sql
SELECT COUNT(*) FROM Movie;
```

## 🎨 Design Features

- **Glassmorphism Effects**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradient theme
- **Smooth Animations**: Hover effects and fade-in animations
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Grid**: Adaptive layout for different screen sizes