# BlogSite

A full-stack blogging platform (frontend + backend) built with JavaScript.  
Users can read, write, edit, and delete blog posts.  

---

## 🧱 Project Structure

```
BlogSite/
├── frontend/         # React / UI / client-side code (or whatever framework you used)
├── backend/          # Server / API / database layer
├── .gitignore
└── README.md         # This file
```

---

## 🚀 Features

- User authentication (login/register)  
- CRUD operations for blog posts  
- Responsive UI for reading and writing posts  
- REST API in backend  
- Possibly more: search, comments, user profile.

---

## 🛠️ Tech Stack

| Layer       | Technology / Tools                  |
|--------------|--------------------------------------|
| Frontend     | JavaScript, CSS, HTML, [React] |
| Backend      | Node.js , Express, MongoDB |
| Others       | Any libraries, tools, hosting, environment setup |

---

## 🔧 Installation & Setup

> These instructions assume you have Node.js and npm (or yarn) installed.

1. Clone the repository  
   ```bash
   git clone https://github.com/Yogesh1306/BlogSite.git
   ```

2. Navigate to backend, install dependencies, set up environment variables  
   ```bash
   cd BlogSite/backend
   npm install
   # or yarn install
   ```

3. Navigate to frontend, install dependencies  
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up `.env` files  
   - For backend: DB connection string, authentication secret, etc.  
   - For frontend: API endpoint URLs, etc.

5. Run the app  
   ```bash
   # from backend folder
   npm run dev
   # from frontend folder (in another terminal)
   npm run dev
   ```

6. By default the app should be available at `http://localhost:3000`.  

---

## 📁 Folder Structure Details

- **frontend/** — all client-side code (UI, components, styles)  
- **backend/** — APIs, database models, controllers, routes  
- `.gitignore` — files/folders to ignore in version control  

---

## 🤝 Contributing

If you or others want to contribute:

- Fork the repo  
- Create a new branch for your feature or fix  
- Make changes, test locally  
- Submit a Pull Request  

---

## 👤 Author

**Yogesh** — [GitHub Profile](https://github.com/Yogesh1306)

---

## 📝 License

This project is licensed under the MIT License.

---

## 🔗 Live Demo / Screenshots (Optional)

If you have hosted version or screenshots, add links or images here to show how the app looks / works.

---
