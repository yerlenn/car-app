# Car App

A car purchasing mobile application where buyers can browse car listings and contact sellers. Built with React Native (Expo) and Node.js.

## Project Structure

```
car-app-project/
├── backend/    # Node.js + TypeScript REST API
└── mobile/     # Expo (React Native) app
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **Expo Go** app on your phone (optional, for testing on a physical device)

## Setup

### 1. Backend

```bash
cd backend
npm install
```

### 2. Mobile

```bash
cd mobile
npm install
```

## Running the App

Start the backend first, then the mobile app.

### Start the Backend

```bash
cd backend
npm run dev
```

The API server starts at `http://localhost:3000`. It uses JSON files for storage (no external database required).

### Run in Browser (fastest)

```bash
cd mobile
npm run web
```

Opens the app at `http://localhost:8081` in your default browser.

### Run on Phone (Expo Go)

```bash
cd mobile
npm start
```

Scan the QR code in the terminal with:
- **iOS** — Camera app
- **Android** — Expo Go app

Your phone must be on the same Wi-Fi network as your computer.

### Run on iOS Simulator (macOS only)

Requires Xcode installed.

```bash
cd mobile
npm run ios
```

### Run on Android Emulator

Requires Android Studio with an emulator configured.

```bash
cd mobile
npm run android
```

## API Endpoints

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login with username/password|
| GET    | `/api/health`        | Health check                |

## Tech Stack

**Frontend:** Expo SDK 55, React Native, Expo Router, AsyncStorage

**Backend:** Express 4, TypeScript, JWT, bcryptjs, JSON file storage
