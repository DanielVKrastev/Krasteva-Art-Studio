# Krasteva Art Studio - Art Sales Project
A React-based web application for showcasing and selling artworks. Users can browse the portfolio, search forspecific pieces, place orders, and send messages to the administration.
<br />
The project uses the Firebase server to handle backend operations and data management.
<br />
Open the Project in Your Browser: <a href="https://krasteva-art-studio.firebaseapp.com/" target="_blank">Krasteva Art Studio</a>.

Key features:
 - Browse arts by category and size
 - View detailed art info with image
 - Order creation with automated email confirmation;
 - Admin panel for managing arts, orders, user messages;
 - Fully responsive design for mobile & desktop;

## 📦 Getting Started
Follow these steps to run the project locally:

1. Clone the repository:
```sh
git clone https://github.com/DanielVKrastev/Krasteva-Art-Studio.git
```

2. Install dependencies and run the app:
```sh
npm install
npm run dev
```

3. Create new Firebase project:
<a href="https://console.firebase.google.com/u/2/" target="_blank">Firebase Console</a>.

4. Change Base URL in "./src/constants.js" with your Firebase Database.

5. Open new Terminal. Install dependencies, and start the server for upload images in imgur.com:
```sh
cd server
npm install
npm start
```

 <p>Important: Do not shutting down the terminal where the app (React) is running.</p>

6. Open the app:
Go to <a href="http://localhost:5173">http://localhost:5173</a> (or the displayed port) in your browser.

## 🛠 Used Technologies
- JavaScript: Core language for the functionality of the application.
- React: Front-end framework used for building the user interface and handling the application logic.
- TailwindCSS: Utility-first CSS framework for fast styling and responsive design.
- Heroicons: A set of free, open-source high-quality SVG icons, designed to work seamlessly with TailwindCSS.
- React Router: Routing library for handling navigation within a React application, providing dynamic routing capabilities.
- React Router DOM: The DOM bindings for React Router, allowing seamless client-side routing in web applications.
- Firebase Database: Cloud-based NoSQL database used to store and sync application data in real time.
- Firebase Auth: Authentication module used for user registration, login, and session management.
- Vite: Next-generation, fast build tool for modern web applications, used to bundle and serve the project.

## 🚀 Features
### Authentication
   - Guest users: Can browse artworks by category and size, search, place orders, and send messages to the administration.
   - Admin users (login only): Only administrators can log in. They have permissions to manage artworks, orders, user messages, and edit the About page. Navigate to /admin to access the administration interface.
