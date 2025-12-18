# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commonly Used Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase.
- `npm run preview`: Starts a local server to preview the production build.

## Code Architecture

This is a minimal React application built with Vite and TypeScript.

- The main entry point is `src/main.tsx`, which renders the `App` component.
- The root component is `src/App.tsx`.
- Styling is done with CSS files (`src/App.css`, `src/index.css`).
- The project uses `konva` and `react-konva` for 2d canvas rendering.
