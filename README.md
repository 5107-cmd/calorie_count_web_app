# Calorie Count Web App

A full-stack application to calculate and track calorie counts for dishes, built with a React frontend and a Node.js/Express backend. The app allows users to register, log in, input dish names and servings, and view calorie information with a history of previous meals. It features fuzzy matching for dish names, JWT authentication, and rate limiting.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, TypeScript, JWT, express-rate-limit, in-memory store
- **Testing**: Vitest, Jest, @testing-library/react, Supertest
- **Deployment**: Vercel (frontend), Heroku (backend)

## Project Structure
```
calorie_count_web_app/
├── frontend/
│   ├── __tests__/
│   │   └── Calories.test.tsx
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormInput.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ui/
│   │   │       └── button.tsx
│   │   ├── pages/
│   │   │   └── Calories.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── setupTests.ts
├── backend/
│   ├── __tests__/
│   │   └── api.test.ts
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── ctrl.ts
│   │   ├── db.ts
│   │   ├── interfaces/
│   │   │   ├── authService.ts
│   │   │   └── user.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── rateLimit.ts
│   │   ├── models/
│   │   │   └── user.ts
│   │   ├── routes.ts
│   │   ├── server.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   └── utils/
│   │       └── fuzzy.ts
│   ├── jest.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/calorie_count_web_app.git
   cd calorie_count_web_app
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd ../backend
   npm install
   ```

## Running Locally
1. **Run Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:5173`.

2. **Run Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   API runs on `http://localhost:8000`.

## Testing
1. **Frontend Tests**:
   ```bash
   cd frontend
   npm test
   ```
   Tests are in `frontend/__tests__/Calories.test.tsx`.