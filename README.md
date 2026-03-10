# Tolet App (Client)

A React + Vite based rental listing app with an offline-friendly demo mode.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Easy Demo Mode (No Backend Needed)

- Demo mode is the default when `VITE_API_BASE_URL` is not set.
- Home page loads built-in demo listings automatically.
- Login works in local demo mode when API is offline.
- Create listing saves to browser `localStorage` when API is offline.
- Locally saved listings are visible in Home and Listing details.

## Optional Backend Setup

If you have a backend running on a different URL:

1. Create `.env` from `.env.example`
2. Set:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. Restart dev server.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run start` - alias of dev server
- `npm run dev:host` - run dev server with host enabled
- `npm run build` - production build
- `npm run preview` - preview built app
