# 📝 BlogSite

A full-stack blogging platform built with the **MERN stack**, featuring rich text editing, image uploads, user authentication (including Google & GitHub OAuth via Firebase), commenting, and post search — all wrapped in a modern, responsive UI.

---

[![Live Demo](https://img.shields.io/badge/Live%20Demo-blogsite--frontend--pearl.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://blogsite-frontend-pearl.vercel.app/)

---

## 📁 Project Structure

```
BlogSite/
├── backend/ # Node.js + Express REST API
│ └── src/
│ ├── config/ # Environment & app configuration
│ ├── controllers/ # Route handlers (user, post, comment)
│ ├── db/ # MongoDB connection
│ ├── middleware/ # Auth, error handling, validation
│ ├── models/ # Mongoose models (User, Post, Comment)
│ ├── routes/ # API route definitions
│ └── utils/ # ApiError utility & helpers
└── frontend/ # React + Vite SPA
└── src/
├── components/ # Reusable UI components
├── layouts/ # App layout wrappers
├── redux/ # Redux Toolkit store & slices
└── routes/ # Page-level components
```

---

## ✨ Features

- **Authentication** — Register/Login with email & password (JWT-based), plus **Google** and **GitHub** OAuth via Firebase
- **Create & Edit Posts** — Rich text editor powered by `react-quill-new`
- **Image Uploads** — Media managed via **ImageKit** (cloud CDN)
- **Comments** — Threaded commenting on individual posts
- **Post Search** — Search/filter posts with a dedicated results page
- **Featured Posts** — Highlighted posts on the homepage
- **Persistent Auth** — Redux + `redux-persist` keeps user session alive across refreshes
- **Notifications** — Toast alerts via `react-toastify`
- **Responsive UI** — Styled with **Tailwind CSS v4** and **Ant Design v6**
- **Time Formatting** — Relative timestamps with `timeago.js`

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 7 | Build tool & dev server |
| React Router 7 | Client-side routing |
| Redux Toolkit + redux-persist | Global state & session persistence |
| TanStack React Query | Server state & data fetching |
| Tailwind CSS v4 | Utility-first styling |
| Ant Design v6 | UI component library |
| Firebase 12 | Google & GitHub OAuth |
| ImageKit React | Image upload & optimization |
| react-quill-new | Rich text editor |
| Axios | HTTP client |
| react-toastify | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 9 | Database & ODM |
| JSON Web Tokens (JWT) | Auth token issuance & verification |
| bcrypt | Password hashing |
| Arctic | OAuth helpers |
| ImageKit Node SDK | Server-side image management |
| cookie-parser | Cookie-based token handling |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Dev auto-restart |

---

## 🗄️ Database Models

| Model | Key Fields |
|---|---|
| **User** | name, email, password, avatar, provider (local/google/github) |
| **Post** | title, content, image, author (ref: User), category, slug |
| **Comment** | body, post (ref: Post), author (ref: User), createdAt |

---

## 📡 API Endpoints

### Auth / User Routes (`/api/users`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login with email & password |
| POST | `/logout` | Logout (clear cookie) |
| GET | `/profile` | Get authenticated user's profile |

### Post Routes (`/api/posts`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all posts (with search/filter) |
| GET | `/:slug` | Get a single post by slug |
| POST | `/` | Create a new post (auth required) |
| PUT | `/:id` | Update a post (author only) |
| DELETE | `/:id` | Delete a post (author only) |

### Comment Routes (`/api/comments`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/:postId` | Get all comments for a post |
| POST | `/` | Add a comment (auth required) |
| DELETE | `/:id` | Delete a comment (auth required) |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas URI)
- ImageKit account
- Firebase project (for Google & GitHub OAuth)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Yogesh1306/BlogSite.git
cd BlogSite
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Scripts

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start server with nodemon |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables Summary

| Variable | Where | Description |
|---|---|---|
| `MONGODB_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret for signing JWTs |
| `IMAGEKIT_*` | Both | ImageKit credentials |
| `VITE_FIREBASE_*` | Frontend | Firebase SDK config |
| `VITE_API_BASE_URL` | Frontend | Backend API base URL |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Yogesh** — [@Yogesh1306](https://github.com/Yogesh1306)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).