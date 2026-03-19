## 📑 Table of Contents

- [🚀 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [📷 Screenshots](#-screenshots)
- [🔧 Known Issues & Future Improvements](#-known-issues--future-improvements)
- [✨ Potential Enhancements](#-potential-enhancements)
- [🛠 Tech Stack](#-tech-stack)
- [🗂 Configuration Files](#-configuration-files)
- [📌 Installation & Setup](#-installation--setup)
- [📌 Usage](#-usage)
- [📡 API Documentation](#-api-documentation)
- [📝 License](#-license)
- [🔗 Contacts](#-contacts)

## 🚀 Project Overview

Globblog is a full-featured blog application built with the MERN stack, following atomic design principles for a structured frontend. Initially developed as a showcase project, it is now near-professional grade with potential for public launch.

**Source Code:** [GitHub Repository](https://github.com/vishnudt2004/globblog)
**Live Demo:** [Globblog](https://globblog.vercel.app/)

### 🔹 Highlights

- This is my first **MERN stack** project.
- Development began in **March 2024** and continued intermittently until **March 2025**.
- Well-structured frontend and backend with high modularity.

## ✨ Features

- **Welcome/Landing Page** - Displays when a user visits the site for the first time.
- **Authentication**
  - Register with email verification (activation link sent via email).
  - Login with persistent authentication for a set time period.
  - Logout, password reset request & reset (link with expiration sent via email).
  - Google OAuth2.0 authentication for Google users.
- **Blogs**
  - View latest and trending blogs (based on weekly read count) with infinite scrolling pagination.
  - Create, update, delete blogs.
  - Track blog read count.
- **User Management**
  - User profile with list of published blogs.
  - Update and delete user accounts (with verification step).
- **Security**
  - Auto-authentication until session expiry.
  - Password authentication (normal users) or OTP validation (Google users) before risky actions (e.g., deleting/updating blogs or accounts).
- **Search**
  - Search blogs with infinite scrolling pagination.
- **Writing Blogs**
  - Rich-text editor (QuillJS) with text formatting, lists, links, images, videos, code blocks, and background/foreground color options.
  - Browser local storage prevents data loss while drafting.
- **Tips Section**
  - Writing a blog, understanding read count, updating user profiles, and more.
- **Theme**
  - Dark/Light mode (auto-switch based on last used theme).
- **User Experience Enhancements**
  - Handles server errors with notifications.
  - Displays user action notifications.
  - 404 Page not found & Unauthorized route redirections.
  - Fully responsive for mobile & desktop.

## 📸 Screenshots

### 🖥️ Desktop View

#### 🏠 Welcome Page

![Welcome - Light](<./screenshots/Desktop%20View/1.1%20Globblog%20-%20Welcome%20Page%20(Light%20mode).png>)

![Home Page](./screenshots/Desktop%20View/2.1%20Globblog%20-%20Home%20Page.png)

🔎 Want to see more? → [View Full Screenshot Gallery](./screenshots/SCREENSHOTS.md)

## 🔧 Known Issues & Future Improvements

### 📝 Write a Blog

- Blogs with high indentation may not display well on mobile screens.
- Resizing images in the rich-text editor can cause stretching issues on smaller screens.

### ⚙️ Development

- The project structure follows personal conventions, which may be hard for others to understand.

### 🎨 UI & UX

- **Footer:** Social media links are placeholders, not real links.
- **Home & Search:** Latest blogs persist on navigation, but Trending & Search results do not (for real-time accuracy).
- **Write Page:** Limited blog tags/keywords; custom tags are not allowed.

## ✨ Potential Enhancements

- **SEO Optimization:** Needs proper metadata for better search engine visibility.
- **Image Optimization:** No image compression yet, which affects loading speed.
- **Code Refactoring:** Some components can be optimized for better maintainability.
- **Performance Tweaks:** Initial page load time can be improved by reducing unnecessary re-renders.
- **Likes & Comment System:** Implement a like feature and enhance the comment system with edit/delete functionality.

## 🛠 Tech Stack

- **Frontend:** React.js (Atomic Design), Redux, QuillJS (Rich Text Editor)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT-based authentication, Google OAuth2.0
- **Deployment:**
  - **Frontend:** GitHub + Vercel
  - **Backend:** GitHub + Render
  - **Database:** MongoDB Atlas

## 🗂 Configuration Files

- **Frontend:**
  - [`/src/styles/config.css`](frontend/src/styles/config.css) – UI-related variables and theme settings.
  - [`/src/config/config.js`](frontend/src/config/config.js) – App-level constants and UI config toggles.
- **Backend:**
  - [`/src/config/config.js`](backend/src/config/config.js) – Environment-based constants and app-wide configurations (e.g., base URLs, SMTP config references).

## 📌 Installation & Setup

### Prerequisites

- Node.js (>=16)
- MongoDB
- Git

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/vishnudt2004/globblog.git
   cd globblog
   ```

2. **Install dependencies**

   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Run the application**

   ```sh
   cd frontend && npm run dev
   cd ../backend && npm run dev  # or npm run prod
   ```

4. **Environment Variables**
   Create a `.env` file in the frontend directory (`frontend/.env`) and add:

   ```sh
   VITE_ENV=development/production
   VITE_CLIENT_URL=client_url
   VITE_SERVER_URL=server_url
   ```

   Create a `.env` file in the backend directory (`backend/src/config/.env`) and add:

   ```sh
   NODE_ENV=development/production
   PORT=port_number
   CLIENT_URL=http://127.0.0.1:5173
   SERVER_URL=http://127.0.0.1:8000
   DB_CONNECTION=mongodb_url
   SMTP_HOST=smtp_host
   SMTP_PORT=smtp_port
   SMTP_USER=smtp_username
   SMTP_PASS=smtp_password
   SMTP_FROM=email_address
   JWT_SECRET=jwt_secret
   GOOGLE_CLIENT_ID=google_client_id
   GOOGLE_CLIENT_SECRET=google_client_secret
   INITIAL_SEED=true/false
   INITIAL_SEED_ACTION=WipeUsers/WipeBlogs/SeedUsers/SeedBlogs/WipeAndSeedAll
   ```

5. Optional – HTTPS Setup for Local Development (This setup helps test features that require a secure context (e.g., Google OAuth 2.0))

- Frontend
  - Update any URLs (e.g., `VITE_CLIENT_URL`, `SERVER_URL`) in both `.env` and `config.js` to start with `https://` instead of `http://`.
  - In vite.config.js, uncomment the following in the server config:
    ```js
    server: {
    https: true,
    // ...other options
    }
    ```

- Backend:
  - Update all URLs (e.g., `CLIENT_URL`, `SERVER_URL`) in both `.env` and `config.js` to start with `https://` instead of `http://`.
  - In `server.js`, enable the local HTTPS server:
    ```js
    const server = devHttpsServer(app); // Uncomment this line
    ```

- Self-Signed SSL Certificate (for HTTPS in Development) (If using HTTPS in development, generate a self-signed SSL certificate:)

  ```sh
  mkdir certs && cd certs
  openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.cert -days 365 -nodes
  ```

  Place the `server.key` and `server.cert` files inside a `certs/` folder located in the root directories of both the /frontend and /backend.
  Your browser may warn you about unsafe certificates—proceed manually or configure the browser to trust your certificate for local dev.

## 📌 Usage

- Register or log in to create and manage blogs.
- Browse latest & trending blogs or search specific blogs.
- Manage user profile and view published blogs.

## 📡 API Documentation

Example API response structure (prod env):

```json
{
  "status": "success",
  "message": "string",
  "result": { "blogs": [], "totalPages": number, "totalResults": number }
}
```

For more API details, refer to the backend documentation. **(backend/docs/)**

See [`backend/docs/Globblog APIs.md`](./backend/docs/Globblog%20APIs.md) for full reference.

## 📝 License

This project is **proprietary** and **all rights are reserved**.  
It **may not** be copied, modified, distributed, or used for commercial purposes without explicit permission from the owner.

See the full [LICENSE](./LICENSE) for more details.

For inquiries regarding usage, please refer to the [Contact](#-contacts) section.

## 🔗 Contacts

- 🌐 Portfolio: [portfolio-vishnud](https://portfolio-vishnud.vercel.app/)
- 💻 GitHub: [vishnudt2004](https://github.com/vishnudt2004)
- 🔗 LinkedIn: [vishnu-dt](https://www.linkedin.com/in/vishnu-dt)
- 🧠 LeetCode: [vishnud2004](https://leetcode.com/vishnud2004/)
- 🧠 HackerRank: [vishnu_d_t_2004](https://www.hackerrank.com/profile/vishnu_d_t_2004)
- 📧 Email: [vishnu.d.t.2004@gmail.com](mailto:vishnu.d.t.2004@gmail.com)
