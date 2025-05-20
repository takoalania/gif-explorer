# 🎉 GIF Explorer

A full-stack GIF search app with a custom Express backend and a responsive React frontend. Powered by the Giphy API.

---

## 📸 Preview

> ![Demo Screenshot](./screenshot.png)  
> _Yes, it supports trending & search, pagination, and empty states._

---

## 📦 Tech Stack

- **Frontend:** React + TypeScript + CSS Modules
- **Backend:** Node.js + Express + TypeScript
- **API:** Giphy API (via backend proxy)
- **Dev Tools:** Docker, Vite, Nodemon

---

## 🚀 Getting Started (Local Dev)

1. **Clone the repo**

   ```bash
   git clone https://github.com/takoalania/gif-explorer.git
   cd gif-explorer
   ```

2. **Create `.env` files**

   **backend/.env**
   ```
   GIPHY_API_KEY=your_giphy_api_key
   PORT=4000
   ```

   **frontend/.env**
   ```
   VITE_API_BASE_URL=http://localhost:4000/api
   ```

3. **Run locally with Docker Compose**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:4000/api/trending](http://localhost:4000/api/trending)

---

## 🐳 Production Setup

```bash
docker-compose -f docker-compose.yml up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## 🛠️ Scripts

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
```

### Backend

```bash
npm run dev      # Start dev server with Nodemon
npm run build    # Compile TypeScript
npm start        # Run compiled backend
```

---

## 🔌 API Endpoints

### `GET /api/trending`

- Returns trending GIFs
- Supports: `page`, `limit` (pagination)

### `GET /api/search`

- Returns search results for a query
- Required: `q`
- Optional: `page`, `limit`, `rating`

---

## ✅ Features

- ✅ Responsive GIF grid layout
- ✅ Square cards with image + title
- ✅ Search with debounced input
- ✅ Loading and error states
- ✅ Pagination with page sync in URL
- ✅ Mobile-friendly design
- ✅ Dockerized for dev & prod

---

## 🧾 Environment Variables

**frontend/.env**
```
VITE_API_BASE_URL=http://localhost:4000/api
```

**backend/.env**
```
GIPHY_API_KEY=your_key_here
PORT=4000
```

You can copy from `.env.example` in each folder.

---

## 🧪 Folder Structure

```
gif-explorer/
├── frontend/
│   ├── public/
│   ├── src/
│   └── .env
├── backend/
│   ├── routes/
│   └── .env
├── docker-compose.dev.yml
├── docker-compose.yml
└── README.md
```

---

## 🔒 Git Ignore Highlights

- `.env` is excluded in both frontend and backend
- `node_modules`, `dist`, `.DS_Store`, IDE folders are also ignored

---

## 🍌 Bonus Banana

```
 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                        _,.-:\
    \ \   `.  `-._             __..--' ,-';/
     \ `.   `-.   `-..___..---'   _.--' ,'/ 
      `. `.    `-._        __..--'    ,' / 
        `. `-_     ``--..''       _.-' ,' 
          `-_ `-.___        __,--'   ,' 
             `-.__  `----"""    __.-' 
banana time 🍌
```

---

Made with 💛 by [Tako Alania](https://github.com/takoalania)