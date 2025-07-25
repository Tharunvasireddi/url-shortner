# 🔗 URL Shortener - MERN Stack Project

Welcome to the **URL Shortener** – a full-stack web app built with the MERN stack that allows users to shorten long URLs, track clicks, and manage their links through an elegant, modern UI styled with **TailwindCSS**.

🌍 **Live Demo**: [https://url-shortner-three-xi.vercel.app/](https://url-shortner-three-xi.vercel.app/)

---

## 🚀 Tech Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Frontend   | React.js + TailwindCSS              |
| Backend    | Node.js + Express.js                |
| Database   | MongoDB (Mongoose)                  |
| Auth       | JWT (JSON Web Token)                |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

* 🔐 **User Authentication**
* ✂️ **Instant URL Shortening**
* 📊 **Click Analytics**
* 📁 **User-Specific Link Management**
* 🎨 **Responsive TailwindCSS UI**
* 🔄 **Full CRUD Operations for Links**
* 📈 **Click Counter for Each Shortened URL**

---

## 📸 Preview

> *Here's what it looks like when function meets finesse...*

<!-- Replace the below line with a real screenshot or demo GIF link -->

![App Screenshot](https://your-screenshot-link-here.com)

---

## 📂 Folder Structure

```
/client         → React + TailwindCSS frontend
  /components   → Reusable UI components
  /pages        → Main routes (Home, Auth, Dashboard)

 /server        → Express.js backend
  /models       → Mongoose models (User, Link)
  /routes       → Auth & Link routes
  /controllers  → API logic for each route
```

---

## 🧐 Getting Started Locally

### 📦 Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* Vercel CLI (optional)
* Render account (for backend deployment)

### 🛠️ Installation Steps

```bash
# Clone the repo
git clone https://github.com/your-username/url-shortener-mern.git
cd url-shortener-mern

# Install backend dependencies
cd server
npm install

# Create .env file
cp .env.example .env
# Fill in your MongoDB URI and JWT secret

# Start backend
npm run dev

# Open new terminal, install frontend
cd ../client
npm install

# Start frontend
npm run dev
```

---

## 🔐 Backend .env Example

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
BASE_URL=https://your-backend-render-url.com
```

---

## 🌐 Deployment

### 🔸 Frontend (Vercel)

1. Push your `/client` folder to a GitHub repo
2. Import the repo in [Vercel](https://vercel.com/)
3. Set any environment variables if needed
4. Hit deploy — and boom! 🎉

### 🔹 Backend (Render)

1. Push `/server` to a GitHub repo
2. Go to [Render](https://render.com/), create a new **Web Service**
3. Connect your GitHub repo
4. Add required environment variables under “Environment”
5. Deploy and copy the base URL

---

## 💡 Future Enhancements

* 🖊️ Custom short URL aliases
* 📅 Link expiration support
* 🌐 Social media link previews
* 📲 QR code generation
* 🌙 Light/Dark mode toggle

---

## 🤝 Contributing

Got ideas or found bugs?
Feel free to `fork` this repo, create a new branch, and submit a pull request!

---

## 📄 License

Licensed under the MIT License. See `LICENSE` for more info.

---

## 👤 Author

Built with ❤️ by **Srinivas Koruprolu**
Let’s connect: [LinkedIn](https://www.linkedin.com/in/srinivaskoruprolu)

---

## ⭐️ Show Your Support

If you liked this project, please consider giving it a **star** ⭐️
Every ⭐ keeps the links shorter and the motivation longer 😄

---
