# CSE Department Website — MERN Stack

A simple, attractive, responsive website for the **Department of Computer Science and Engineering,
D. Y. Patil College of Engineering and Technology, Kolhapur, Maharashtra**.

Built as a student MERN project that demonstrates the concepts of all four syllabus units
and is easy to explain during a practical demonstration and viva.

> **Note on content:** All faculty names, contact details, curriculum and notices are clearly
> labelled **SAMPLE** content. Replace them with verified official college information later.

---

## 1. Project Folder Structure

```
cse-department-website/
├── client/                      # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js           # dev server + /api proxy to Express
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Routes for every page
│       ├── theme.js             # MUI theme (navy blue + white)
│       ├── api.js               # Axios instance + JWT header
│       ├── styles.css           # Responsive CSS
│       ├── components/
│       │   ├── Navbar.jsx       # AppBar, Toolbar, Drawer (mobile)
│       │   ├── Footer.jsx
│       │   ├── PageHeader.jsx   # Reusable page banner
│       │   ├── StateViews.jsx   # Loader / Error / Empty states
│       │   └── AdminRoute.jsx   # Client-side admin guard
│       ├── data/
│       │   └── academics.js     # Editable FE/SE/TE/BE content
│       └── pages/
│           ├── Home.jsx         # Banner, quick links, highlights, announcements
│           ├── About.jsx        # Vision, mission, objectives
│           ├── Academics.jsx    # Year tabs + subjects table
│           ├── Faculty.jsx      # Faculty cards from API
│           ├── Activities.jsx   # Announcements with category filter
│           ├── Projects.jsx     # Project cards + table
│           ├── Contact.jsx      # Validated form → MongoDB
│           ├── AdminLogin.jsx   # JWT login
│           └── AdminDashboard.jsx # Add/Edit/Delete with MUI Dialogs
│
├── server/                      # Node.js + Express backend
│   ├── package.json
│   ├── server.js                # App creation, middleware, routes
│   ├── seed.js                  # Sample data → MongoDB (npm run seed)
│   ├── .env / .env.example      # MONGODB_URI, PORT, JWT_SECRET, admin login
│   ├── config/db.js             # Mongoose connection
│   ├── models/                  # Faculty, Announcement, Project, ContactMessage
│   ├── routes/                  # faculty, announcements, projects, contact, auth, theme
│   ├── controllers/             # All request/response logic
│   ├── middleware/              # authMiddleware (JWT), validate, errorHandler
│   ├── demos/fs-demo.js         # Node fs module + event loop demo
│   └── uploads/                 # Faculty photo uploads (multer)
│
├── ejs-demo/                    # Separate small Express + EJS template demo
└── README.md
```

---

## 2. Prerequisites & Installation

**Prerequisites**

1. Node.js (v18 or newer) — check with `node -v`
2. MongoDB running locally (`mongod`) **or** a MongoDB Atlas URI
3. Two terminal windows (one for `server`, one for `client`)

**Install everything (run inside `cse-department-website/`)**

```bash
# Backend
cd server
npm install

# Frontend (new terminal)
cd ../client
npm install

# Optional EJS template demo (new terminal)
cd ../ejs-demo
npm install
```

---

## 3. Environment Variables (MongoDB connection & secrets)

Create `server/.env` (a ready `.env.example` is provided):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/cse_department
PORT=5000
JWT_SECRET=cse_college_demo_secret_key_12345
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

- The frontend **never** sees these values — only Express reads them with `process.env`.
- `.env` is listed in `.gitignore` so credentials are never committed.

---

## 4. MongoDB Schemas & Sample Data

| Collection         | Model file                    | Key fields                                                     |
|--------------------|-------------------------------|----------------------------------------------------------------|
| `faculty`          | `server/models/Faculty.js`    | name, designation, qualification, expertise, email, photo      |
| `announcements`    | `server/models/Announcement.js` | title, description, category (enum), date, venue              |
| `projects`         | `server/models/Project.js`    | title, description, technologies[], year (FE/SE/TE/BE)         |
| `contactMessages`  | `server/models/ContactMessage.js` | name, email, message                                        |

Each schema uses Mongoose **validation** (`required`, `enum`, `maxlength`, `match`).
`mongoose.connect()` happens in `server/config/db.js` using the `MONGODB_URI` variable.

**Load sample data:**

```bash
cd server
npm run seed
```

This clears and reloads 4 faculty, 4 announcements and 4 sample projects
(Student Management System, Library Management System, College Event Portal, Quiz App).

---

## 5. Running the Website (two terminals)

```bash
# Terminal 1 — backend (http://localhost:5000)
cd cse-department-website/server
npm run seed      # first time only
npm run dev       # or: npm start

# Terminal 2 — frontend (http://localhost:5173)
cd cse-department-website/client
npm run dev
```

Open **http://localhost:5173** in the browser.

Optional third demo (template engine):

```bash
cd cse-department-website/ejs-demo
npm install && npm start      # http://localhost:4000
```

---

## 6. REST API Endpoints & How to Test

| Method | Endpoint                | Access | Purpose                                  |
|--------|-------------------------|--------|------------------------------------------|
| GET    | `/api/health`           | Public | Check the server is running              |
| GET    | `/api/faculty`          | Public | List faculty                              |
| POST   | `/api/faculty`          | Admin  | Add faculty (multipart: photo optional)   |
| DELETE | `/api/faculty/:id`      | Admin  | Delete faculty                            |
| GET    | `/api/announcements`    | Public | List announcements                        |
| POST   | `/api/announcements`    | Admin  | Add announcement                          |
| PUT    | `/api/announcements/:id`| Admin  | Edit announcement                         |
| DELETE | `/api/announcements/:id`| Admin  | Delete announcement                       |
| GET    | `/api/projects?year=TE` | Public | List projects (optional year filter)      |
| POST   | `/api/projects`         | Admin  | Add project                               |
| PUT    | `/api/projects/:id`     | Admin  | Edit project                              |
| DELETE | `/api/projects/:id`     | Admin  | Delete project                            |
| POST   | `/api/contact`          | Public | Store a contact form message              |
| GET    | `/api/contact`          | Admin  | Read contact messages                     |
| POST   | `/api/auth/login`       | Public | Get JWT token (admin/admin123)            |
| GET    | `/api/auth/verify`      | Admin  | Check token validity                      |
| POST   | `/api/theme`            | Public | Set a theme **cookie**                    |
| GET    | `/api/theme`            | Public | Read the theme cookie                     |

**Test with PowerShell (no Postman needed):**

```powershell
# Public GET
Invoke-RestMethod http://localhost:5000/api/faculty

# Valid POST → 201
Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Riya","email":"riya@example.com","message":"Hello"}'

# Invalid POST → 400 with error array
try { Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method Post `
  -ContentType "application/json" -Body '{"name":"","email":"bad","message":""}' }
catch { $_.Exception.Response.StatusCode.value__ }     # → 400

# Admin login → token
$login = Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method Post `
  -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
$login.token

# Authorized POST → 201  (without the header it returns 401)
Invoke-RestMethod -Uri http://localhost:5000/api/announcements -Method Post `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer $($login.token)" } `
  -Body '{"title":"Workshop","description":"MERN workshop","category":"Workshop"}'
```

**Test the forms in the browser**

| Form          | Page        | What to check                                              |
|---------------|-------------|------------------------------------------------------------|
| Contact       | `/contact`  | Red helper text on empty submit; green success Alert; row appears in Admin → Messages |
| Admin login   | `/admin/login` | Wrong password → red Alert; correct → Dashboard          |
| Admin CRUD    | `/admin`    | Add/edit/delete announcement or project; changes appear on public pages after refresh |
| Year tabs     | `/academics`| URL changes to `/academics/SE`, table and ideas update     |

**Node.js extras**

```bash
cd server
npm run fsdemo     # fs module write/read/append + event loop output
```

---

## 7. Syllabus Concepts Demonstrated (feature by feature)

### React (frontend)

| Concept | Where it is used |
|---|---|
| Functional components | Every file in `components/` and `pages/` |
| Reusable components | `Navbar`, `Footer`, `PageHeader`, `StateViews`, `AdminRoute` |
| Props | `PageHeader title/subtitle`, `StateViews` messages, `AdminRoute children` |
| State (`useState`) | Form inputs, API data, filters, dialogs, tab index |
| `useEffect` | Fetching faculty/announcements/projects after mount |
| Event handling | `onClick` (buttons, icons), `onChange` (inputs, tabs, selects), `onSubmit` (contact, login) |
| Controlled inputs | Contact form, login form, admin dialogs |
| Client validation | `validate()` in `Contact.jsx`, `validateAnnouncement()` in `AdminDashboard.jsx` |
| Conditional rendering | `Loader`, `ErrorAlert`, `EmptyState`, success/error `Alert`, 404 route |
| Responsive CSS | `styles.css` media queries + MUI Grid breakpoints |
| Tables | Subjects table (`Academics`), projects table, admin tables |
| MUI components | AppBar, Toolbar, Container, Card, Button, TextField, Table, Alert, Dialog, Tabs, Chip, Drawer, Avatar |
| React Router | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useNavigate` |
| Axios interceptors | `api.js` attaches `Authorization: Bearer <token>` |

### Node.js & Express (backend)

| Concept | Where it is used |
|---|---|
| Node server | `server.js` (`app.listen`) |
| npm packages | express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, cookie-parser, multer |
| Express app | `server.js` |
| GET / POST / PUT / DELETE routes | `server/routes/*.js` |
| Request & response objects | Controllers use `req.body`, `req.params`, `req.query`, `res.status().json()` |
| Middleware | `express.json()`, `cors()`, `cookieParser()`, logger, `protect`, `validateBody`, `errorHandler` |
| Async functions & callbacks | `async/await` in controllers; callbacks in `demos/fs-demo.js` |
| Modules (`require` / `module.exports`) | Every file in models, routes, controllers, middleware |
| Event loop | Request logger + `demos/fs-demo.js` (`setTimeout` prints first) |
| File System module | `demos/fs-demo.js` (write → read → append) |
| Environment variables | `dotenv` + `process.env.MONGODB_URI`, `PORT`, `JWT_SECRET` |
| Cookies | `cookie-parser` + `routes/themeRoutes.js` |
| File uploads | `multer` disk storage in `routes/facultyRoutes.js` (2 MB, images only) |
| Template engine | Separate `ejs-demo/` with `res.render()` |
| Meaningful status codes | 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error |

### MongoDB / Mongoose (database)

| Concept | Where it is used |
|---|---|
| Connection via env variable | `config/db.js` reads `MONGODB_URI` |
| Schemas & models | `models/*.js` |
| Validation | `required`, `enum`, `maxlength`, `match`, custom validator |
| CRUD operations | `find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete` |
| Queries & filters | `?year=TE` in projects, `.sort({ date: -1 })` |
| Timestamps | `createdAt` / `updatedAt` on every schema |
| Seed script | `seed.js` with `insertMany` + `deleteMany` |

### Security (section 4 of the brief)

- Admin operations are protected **on the server** by `middleware/authMiddleware.js` (JWT).
  Hiding buttons in React alone is not used as security.
- `.env` holds DB URL, JWT secret and demo admin credentials; never exposed to React.
- Server-side validation returns `400` with an `errors` array.
- **Documented limitation:** credentials are checked against `.env` instead of a hashed
  password in an `admins` collection. This is a clearly labelled **development-only**
  approach for a college demo; for production, store a bcrypt hash in MongoDB and add
  refresh-token/session handling.

---

## 8. Common Errors & Solutions

| Error | Cause | Solution |
|---|---|---|
| `MONGODB_URI is missing` | `.env` not created | Copy `.env.example` → `.env` in `server/` |
| `MongoDB connection failed` | `mongod` not running | Start MongoDB service, or use an Atlas URI |
| `ECONNREFUSED 127.0.0.1:5000` in browser | Backend not running | Start `npm run dev` inside `server/` |
| CORS error in console | React port not allowed | Keep `VITE` dev on 5173, or add your origin in `server.js` cors list |
| `401 Not authorized: no token` on admin API | Not logged in, or token expired | Log in again at `/admin/login` (token expires in 1 day) |
| `400 Validation failed` | Missing/invalid fields | Check the `errors` array in the response |
| Blank pages / `Element type is invalid` | Typo in a component import | Check the import path and default vs named export |
| `Port 5000 already in use` | Another process using the port | Change `PORT` in `.env`, or stop the other process |
| `npm install` very slow | Network / registry | Run `npm install --no-audit --no-fund` |
| `Cannot GET /` on backend | Normal behaviour | API routes start with `/api/...`; use `/api/health` |
| Upload fails: `Only image files are allowed` | Wrong MIME type | Select a `.jpg` / `.png` file under 2 MB |

---

## 9. Testing Checklist (before the demo)

1. `npm run seed` in `server/` → "Seed data inserted successfully"
2. `npm run dev` in `server/` → "MongoDB connected successfully"
3. `npm run dev` in `client/` → open http://localhost:5173
4. Home page shows latest announcements (API-driven)
5. `/academics` → click SE/TE/BE tabs, URL changes
6. `/faculty` → 4 sample cards with avatars
7. `/contact` → submit empty form → errors; valid form → green success
8. `/admin/login` → `admin` / `admin123` → dashboard
9. Add an announcement → it appears on Home / Activities
10. Delete a project → it disappears from `/projects`
11. Log out → visiting `/admin` redirects to login

---

## 10. Project Report Outline

1. **Introduction** — objective, scope of the CSE department website
2. **System Architecture**
   - Browser (React SPA) ⇄ HTTP/JSON ⇄ Express REST API ⇄ Mongoose ⇄ MongoDB
   - Request flow diagram: Component → `api.js` (Axios) → Route → Controller → Model → Database
3. **Requirements** — hardware/software, MongoDB, Node.js, npm
4. **Technologies Used** — React, MUI, React Router, Axios, Express, Mongoose, JWT, Multer
5. **Database Design** — the four collections with field tables (ER-style)
6. **Module Description**
   - Module 1: Public pages (Home, About, Academics, Faculty, Activities, Projects, Contact)
   - Module 2: Admin (login, announcements CRUD, projects CRUD, messages)
   - Module 3: Backend APIs, validation, authentication
7. **Implementation** — screenshots, sample code snippets (schema, protected route, form validation)
8. **Testing** — the API test table in section 6 (expected vs actual status codes)
9. **Security Considerations** — JWT, `.env`, server-side validation, documented limitation
10. **Conclusion & Future Scope** — image gallery, email notifications, password reset, RBAC
11. **References**

---

## 11. Viva Questions & Answers

**Q1. What does MERN stand for?**
MongoDB (database), Express.js (backend framework), React.js (frontend library), Node.js (JavaScript runtime).

**Q2. Why is React called a SPA?**
All pages are rendered in one HTML document; React Router swaps components without a full page reload.

**Q3. Difference between props and state?**
Props are read-only values passed from a parent component; state is data owned by a component that can change and triggers a re-render (`useState`).

**Q4. What is the use of `useEffect`?**
It runs side effects after rendering — here it fetches API data when a page mounts (empty dependency array `[]`).

**Q5. What is a controlled component?**
An input whose value is stored in React state and updated via `onChange` — see the Contact form.

**Q6. Why do we need CORS?**
React (port 5173) and Express (port 5000) are different origins, so the browser blocks cross-origin calls unless the server sends CORS headers.

**Q7. What does `express.json()` do?**
It is middleware that reads the JSON request body and attaches it to `req.body`.

**Q8. How does the server know a request is from the admin?**
The login endpoint signs a JWT with `JWT_SECRET`; every admin request sends `Authorization: Bearer <token>`, and `protect` middleware verifies it before the controller runs.

**Q9. Why is hiding buttons in React not real security?**
Anyone can call the API directly with curl/Postman. Real protection must be enforced server-side — which our `protect` middleware does (unauthorized POST returns **401**).

**Q10. Where is the database URL stored?**
In `server/.env` as `MONGODB_URI`, loaded with `dotenv`. It is never sent to the browser.

**Q11. What is the event loop?**
Node's mechanism that executes callbacks for async operations (I/O, timers) when they finish, so a single thread can handle many requests. Demonstrated in `npm run fsdemo`.

**Q12. Which Node module is used for file operations?**
`fs`. Our demo writes, reads and appends a file asynchronously with callbacks.

**Q13. What is a Mongoose schema?**
A blueprint that defines fields, types and validation for a collection before data is saved.

**Q14. What HTTP status codes does your project use?**
200 OK, 201 Created, 400 Bad Request (validation), 401 Unauthorized (missing/invalid token), 404 Not Found, 500 Server Error.

**Q15. What is the difference between PUT and POST?**
POST creates a new resource (`201`); PUT updates an existing resource identified by its id.

**Q16. How does React Router work?**
`<Routes>`/`<Route>` map URLs to components; `useParams` reads `/academics/:year`, `useNavigate` performs programmatic navigation after login.

**Q17. What is the use of `.env`?**
To keep configuration (ports, secrets, DB URI) out of source code and switch environments without code changes.

**Q18. What is the limitation of your authentication?**
Demo credentials are stored as plain text in `.env` rather than as a bcrypt hash in an admin collection — acceptable for a local college demo, not for production.

**Q19. Which MUI components did you use?**
AppBar, Toolbar, Container, Card, Button, TextField, Table, Alert, Dialog, Tabs, Chip, Drawer, Avatar, Breadcrumbs.

**Q20. How will you deploy this project?**
Frontend build (`npm run build`) on Netlify/Vercel, backend on Render/Railway, database on MongoDB Atlas, with environment variables set in the hosting dashboard.
