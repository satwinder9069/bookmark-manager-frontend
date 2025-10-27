# 🔖 Bookmark Manager - Frontend (React + Vite) 

A modern and responsive **web application** that allows users to easily **save, manage, and organize bookmarks** in one place.
This project is built using **React (Vite)** for fast performance and a clean UI design, integrated with a **Node.js + Express + MongoDB** backend for complete CRUD functionality.

---

## 🚀 Tech Stack
- React (Vite)
- React Router
- Axios for API communication
- TailwindCSS for styling
- Context API / useState for state management 
- Deployed on Vercel -> [Live Demo](https://bookmark-manager-frontend-navy.vercel.app)
---

## ⚙️ Setup & Run
```
git clone https://github.com/satwinder9069/bookmark-manager-frontend.git
cd bookmark-manager-frontend
npm install
npm run dev
```
Backend API URL should be added in .env file:
```
VITE_API_URL=https://bookmark-manager-backend-e243.onrender.com/api/v1
```
---

## 🧩Features
- 🔐 User authentication (login/ register)
- CRUD operations for bookmarks
- Search and Filter bookmarks
- Dark / Light Mode
- Responsive UI
- API integration with backend
- Deployed live via Vercel
---
## 📸 Screenshots
### Desktop Interface - Light Mode
A clean and intuitive desktop interface, showcasing the primary layout with a responsive grid of bookmarks.

<img width="1018" height="518" alt="Screenshot 2025-08-24 195629" src="https://github.com/user-attachments/assets/8f49fdd1-1bee-4609-9634-8492d8621242" />

### Dark Mode Toggle in Action
The application's seamless dark mode, demonstrating the clean color palette and the UI's adaptability for a more personalized user experience.

<img width="1018" height="518" alt="Screenshot 2025-08-24 195650" src="https://github.com/user-attachments/assets/e2d426b5-522c-4d15-aa5c-f7989186c9eb" />

### Creating a New Bookmark
This screenshot demonstrates the bookmark creation process. The form handles user input for the bookmark's core information, including the URL, description, and tags. When submitted, this data is sent to the Express.js backend and saved in the MongoDB database, making the bookmark persistent.

<img width="1018" height="518" alt="Screenshot 2025-08-24 200519" src="https://github.com/user-attachments/assets/266661d9-9597-43d0-8121-f631b2bfc79f" />

### Bookmark Manager - Filtering & Dark Mode in Action
A view of the application in dark mode, highlighting the interactive 'Favourites' filter. The sidebar provides a clear visual cue for the active filter, and the main content area displays only the bookmarks marked as favorite, demonstrating the app's powerful filtering capabilities.

<img width="1909" height="913" alt="Screenshot 2025-08-24 200718" src="https://github.com/user-attachments/assets/041860b8-bc46-4abf-8859-a9ec04aa9df9" />

## Sort Options

<img width="521" height="297" alt="Screenshot 2025-08-24 195748" src="https://github.com/user-attachments/assets/39b8745c-93c0-409f-9054-186a1cce3de8" />

---

## Future Enhancements
- - 📂 Folder based bookmark organization
- - 🧠 AI-based bookmark categorization (using Gemini/OpenAI API)
- - 🔔 User notification & reminders
