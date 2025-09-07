# Habit Tracker

A modern, responsive web application for tracking daily habits and building better routines. Built with React, Vite, and Node.js.

## Features

- **User Authentication**: Secure login and registration system
- **Habit Management**: Create, edit, and delete habits with ease
- **Daily Tracking**: Mark habits as completed for each day
- **Progress Visualization**: View habit completion progress with circular progress bars
- **Notes System**: Add personal notes to track thoughts and reflections
- **Responsive Design**: Fully mobile-responsive interface
- **Dark Mode**: Toggle between light and dark themes
- **21-Day Habit Formation**: Inspired by the principle that consistent practice for 21 days can form lasting habits

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios for API calls
- Lucide React for icons
- React Circular Progressbar
- React Confetti for celebrations

### Backend

- Node.js
- Express.js
- PostgreSQL database
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd habit_tracker_website
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   # Create database and update .env file with database credentials
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd client/habit_tracker
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Usage

1. **Register/Login**: Create an account or log in to existing account
2. **Dashboard**: View all your habits and track daily progress
3. **Add Habits**: Click the "+" button to create new habits
4. **Track Progress**: Mark habits as completed each day
5. **View Statistics**: Monitor your habit streaks and completion rates
6. **Add Notes**: Keep personal notes for reflection

## Project Structure

```
habit_tracker_website/
└── server/
    ├── client/
    │   └── habit_tracker/
    │       ├── src/
    │       │   ├── components/
    │       │   ├── pages/
    │       │   ├── utils/
    │       │   └── assets/
    │       ├── public/
    │       └── package.json
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── db.js
    ├── schema.sql
    ├── server.js
    └── package.json
```

## License

This project is licensed under the ISC License.
