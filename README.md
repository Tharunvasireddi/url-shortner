# URL Shortener Project

Full-stack URL shortener built with an Express + MongoDB backend and a React + Vite frontend. The app supports user authentication, short-link creation with optional custom slugs, redirect handling, and URL management from a dashboard.

## Project Structure

```text
url-shortner/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dao/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── routing/
    │   ├── store/
    │   └── utils/
    └── package.json
```

## Features

- User registration and login
- JWT-based authentication
- Password hashing with Argon2
- Short URL generation with optional custom slug
- Redirect from short URL to original URL
- Dashboard to view and delete saved links
- Copy-to-clipboard support for short links
- Responsive frontend with protected dashboard routing

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT
- Argon2
- CORS, cookie-parser, dotenv

### Frontend

- React 19
- Vite
- TanStack Router
- Redux Toolkit
- TanStack Query
- Axios
- Tailwind CSS
- Lucide React icons

## Backend Overview

The backend entry point is `Backend/src/app.js`. It configures middleware, connects to MongoDB, and registers the API routes.

### Backend Routes

#### Auth APIs

- `POST /api/auth/register` - create a new user account
- `POST /api/auth/login` - authenticate a user and return a token
- `GET /api/auth/me` - return the currently authenticated user

#### URL APIs

- `POST /api/url/create` - create a short URL for the logged-in user
- `GET /api/:id` - redirect from a short URL slug to the original URL
- `GET /api/get/urls` - fetch all URLs for the logged-in user
- `DELETE /api/get/delete/:id` - delete a saved short URL

### Backend Modules

- `controllers/` - request handlers for auth, URL creation, and user URL management
- `routes/` - route registration for auth, URL, and user endpoints
- `services/` - business logic for authentication and URL creation
- `dao/` - database access helpers for URL and user records
- `middlewares/` - authentication middleware and request enrichment
- `models/` - MongoDB models for users and short URLs
- `utils/` - token helpers, password helpers, error handling, and async wrappers

### Backend Environment Variables

Create a `.env` file in `Backend/` with at least:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
Port=3000
```

## Frontend Overview

The frontend is a routed React application with authentication-aware navigation and a protected dashboard.

### Frontend Routes

- `/` - landing page
- `/Login` - login form
- `/Register` - registration form
- `/dashboard` - protected dashboard with URL creation and history

### Frontend Pages

- `HomePage` - marketing landing page with feature highlights and CTAs
- `AuthPage` - auth wrapper that toggles between login and registration UI
- `DashBoard` - dashboard shell that renders the URL shortener form

### Frontend Components

- `Navbar` - responsive navigation bar with auth-aware links and logout
- `LoginForm` - sign-in form with password visibility toggle and error handling
- `RegisterForm` - account creation form with validation and success state
- `UrlForm` - URL shortener form, copy actions, deletion, and URL history

### Frontend State and Utilities

- `store/slices/authSlice.js` - auth state, login, and logout actions
- `utils/axiosInstance.js` - shared Axios client with auth headers and error normalization
- `utils/helper.js` - route guard used to protect the dashboard
- `api/userapi.js` - auth and user URL API calls
- `api/creaeShortUrl-api.js` - short URL creation API call

## Main User Flow

1. Visit the landing page.
2. Register or log in.
3. Open the dashboard.
4. Enter a long URL and optionally a custom slug.
5. Copy the generated short URL.
6. View the saved URL list and delete entries when needed.

## Local Development

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Notes

- The frontend Axios client points to the local backend in development and the deployed backend in production.
- The dashboard route is protected by a TanStack Router guard that checks the authenticated user before allowing access.
- Short links are resolved by the backend redirect route using the stored slug.
