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
