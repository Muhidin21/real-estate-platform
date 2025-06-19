# 🏡 Modern Real Estate Platform - Backend Team Guide

## 🚀 Basic Features
- 🔐 User Authentication (JWT or Firebase)
- 🏘️ Property Listings (Add, Edit, Delete, View)
- 🔍 Search & Filter (Price, Location, Type, Bedrooms, etc.)
- 🗺️ Google Map Integration for property location
- ❤️ Save Favorite Properties
- 📩 Contact Agent form
- 🧑‍💼 Admin Dashboard (View & Manage Users/Properties)

---

## 📁 Folder Structure & Member Roles

```
backend/
├── controllers/             ← 📌 Muhidiin
│   ├── authController.js
│   ├── propertyController.js
│   └── adminController.js
│
├── models/                  ← 📌 Mohamed
│   ├── User.js
│   └── Property.js
│
├── routes/                  ← 📌 Abdijabaar
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   └── adminRoutes.js
│
├── middleware/              ← Shared
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── utils/                   ← Shared
│   └── uploadFile.js
│
├── app.js                   ← 📌 Muhidiin
├── server.js                ← 📌 Muhidiin
```

---

## 👥 Team Member Roles

| Team Member | Responsibility                        | Folder(s)                        |
|-------------|---------------------------------------|----------------------------------|
| Muhidiin    | Build controllers, setup app/server   | controllers/, app.js, server.js  |
| Mohamed     | Define Mongoose models                | models/                          |
| Abdijabaar  | Create and connect routes             | routes/                          |

**Shared:**  
- `middleware/` and `utils/` are shared. Coordinate changes here!

---

## 🔄 GitHub Collaboration Commands

1. **Clone the Project**
   ```sh
   git clone https://github.com/your-leader/real-estate-platform.git
   cd real-estate-platform
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Create Your Own Branch**
   ```sh
   git checkout -b your-name-feature
   ```

4. **Make Changes in Your Folder**  
   _Edit only your assigned files._

5. **Stage and Commit Changes**
   ```sh
   git add .
   git commit -m "Added Property model"
   ```

6. **Push Your Branch to GitHub**
   ```sh
   git push origin your-name-feature
   ```

7. **Submit Pull Request**
   - Go to GitHub → Click "Compare & Pull Request" → Submit.

8. **Always Pull Latest Code Before Working**
   ```sh
   git pull origin main
   ```

---

## ✅ Best Practices

- **Only edit files in your assigned folder(s).**
- **Communicate before making changes in shared folders.**
- **Write clear commit messages.**
- **Review PRs for code quality and conflicts.**
- **Keep your branch up to date with `main`.** 