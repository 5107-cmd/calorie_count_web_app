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

4. **Set Up Environment Variables**:
   - Frontend: Create `frontend/.env` and `frontend/.env.production`:
     ```
     VITE_API_URL=http://localhost:8000
     ```
     For production:
     ```
     VITE_API_URL=https://your-heroku-app.herokuapp.com
     ```
   - Backend: Copy `backend/.env.example` to `backend/.env`:
     ```bash
     cp backend/.env.example backend/.env
     ```
     Update `backend/.env`:
     ```
     JWT_SECRET=your_jwt_secret
     NUTRITION_API_KEY=your_nutrition_api_key
     RATE_LIMIT_REQUESTS=100
     RATE_LIMIT_WINDOW_MS=900000
     PORT=8080
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
   Tests are in `frontend/__tests__/Calories.test.tsx`, covering form submission, previous meals, unauthorized requests, and logout.

2. **Backend Tests**:
   ```bash
   cd backend
   npm test
   ```
   Tests are in `backend/__tests__/api.test.ts`, covering calorie requests, fuzzy matching, rate limiting, and authentication.

## Deployment
### Frontend (Vercel)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```
   - Set root to `frontend/`.
   - Build command: `npm run build`.
   - Output directory: `dist`.
   - Add `VITE_API_URL=https://your-heroku-app.herokuapp.com`.

3. Test at the Vercel URL (e.g., `https://your-app.vercel.app`).

### Backend (Heroku)
1. Install Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Create Heroku App:
   ```bash
   cd backend
   heroku create your-heroku-app
   ```

3. Set Environment Variables:
   ```bash
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NUTRITION_API_KEY=your_nutrition_api_key
   heroku config:set RATE_LIMIT_REQUESTS=100
   heroku config:set RATE_LIMIT_WINDOW_MS=900000
   heroku config:set PORT=8080
   ```

4. Deploy:
   ```bash
   git add .
   git commit -m "Deploy backend"
   heroku git:remote -a your-heroku-app
   git push heroku main
   ```

5. Test API:
   ```bash
   curl -X POST https://your-heroku-app.herokuapp.com/auth/register -H "Content-Type: application/json" -d '{"first_name":"Test","last_name":"User","email":"test@example.com","password":"password123"}'
   ```

### Connect Frontend and Backend
1. Update `VITE_API_URL` in Vercel:
   ```bash
   vercel env add VITE_API_URL production
   ```
   Enter: `https://your-heroku-app.herokuapp.com`

2. Add CORS to `backend/src/app.ts`:
   ```typescript
   app.use(cors({ origin: 'https://your-app.vercel.app' }));
   ```

## Troubleshooting
- **Frontend Issues**:
  - Verify `VITE_API_URL` matches the Heroku URL.
  - Check browser console for CORS or API errors.
- **Backend Issues**:
  - View logs: `heroku logs --tail`.
  - Ensure `dist/` is generated (`npm run build`).
- **Tests Failing**:
  - Run `npm test` in `frontend/` and `backend/` to debug.
  - Check `Calories.tsx` and `ctrl.ts` for expected behavior.