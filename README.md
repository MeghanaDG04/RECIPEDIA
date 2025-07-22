# 🍽️ RECIPEDIA - Your Personalized Recipe Sharing Platform

Recipedia is a full-stack web application that allows users to add, explore, and manage delicious recipes with ease. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, it offers a user-friendly interface, personalized recipe collections, and community interaction features like likes and comments.

---

## 🌟 Features

- 🔐 User Authentication (Sign-up/Login)  
- 📝 Add, Edit, Delete Recipes  
- ❤️ Like & Comment on others’ recipes  
- 🔍 Search & Filter recipes  
- 👤 User Profiles to view and manage favorite recipes  
- 📱 Responsive Design for all devices  
- 📦 MongoDB Cloud Storage for efficient data management  

---

## 🛠️ Built With

- **React.js** – Frontend *(now powered by Vite)*
- **Node.js & Express.js** – Backend  
- **MongoDB & Mongoose** – Database  
- **Tailwind CSS v4** – Styling *(replacing plain CSS3)*

---

## 🚀 Updated Setup Instructions for frontend(Post Vite + Tailwind Migration)

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/MeghanaDG04/RECIPEDIA.git
cd RECIPEDIA/frontend

# Install dependencies
npm install
```

### 🧪 Development

```bash
npm run dev
```

This will start the Vite dev server at [http://localhost:5173](http://localhost:5173).

### 🧱 Production Build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🎨 Tailwind CSS Integration

Tailwind is configured using Vite’s official plugin. Key setup includes:

- `tailwind.config.js` and `postcss.config.js` added
- `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;` included in `src/index.css`

---

## 🔄 Migration Notes

- Replaced Create React App with **Vite** for faster builds and better Tailwind support
- Removed `react-scripts` and CRA-specific configs
- Updated all run/build commands in this README

---

## 🤝 Contributing

Feel free to raise issues or submit PRs! If you're working on a feature, please request assignment on the relevant issue.
