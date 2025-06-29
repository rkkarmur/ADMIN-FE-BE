# Rental Admin Panel

A responsive admin panel built with **React 19**, **TypeScript** and **Vite**. The project demonstrates a minimal setup with session based authentication, reusable UI components and a responsive sidebar.

## Folder Structure

```
public/             Static assets and fonts
src/
  assets/           Application images and other assets
  components/       Reusable React components (sidebar, profile widgets, UI library)
  config/           App constants, routes and API endpoints
  layouts/          Shared page layouts
  pages/            Application pages and route entry points
  redux/            Thunks that communicate with the API
  services/         API abstraction layer
  store/            Redux store and reducers
```

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and adjust `VITE_API_URL` for your backend.

## Available Scripts

- **`npm run dev`** – start the development server
- **`npm run build`** – type check and create a production build in `dist/`
- **`npm run lint`** – run ESLint over the project

Open `http://localhost:5173` after running `npm run dev` (port may vary).

## Sidebar & Mobile Support

The sidebar collapses into a drawer on small screens. Use the hamburger button at the top of each page to toggle it. This behaviour is implemented in `Sidebar` and `DashboardLayout` components.

## Reusable UI Components

All buttons and loaders are provided in `src/components/ui`. Use `SubmitButton`, `CancelButton` or the generic `Button` component for all interactive elements to keep styling consistent.

## Project Purpose

This repository acts as a lightweight template for building admin panels. It includes:

- Session based authentication with login/logout flows
- Protected routes via a `PrivateRoute` wrapper
- Basic profile management pages
- Toast notifications and loading indicators

Feel free to extend the pages and API calls for your own needs.

