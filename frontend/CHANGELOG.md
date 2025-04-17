# Changelog

All notable changes to this project will be documented in this file (Frontend).

## [1.0.2] - 2025-04-17

### Fixed (April 17)

- Fixed issue with orphan blog placeholder not showing in BlogCard and BlogViewer. Now it properly appears when either author is null or orphan is true.

### Changed (April 14)

- New Feature & Environment Variable
  - Added `ErrorBoundary` component to handle errors individually (detailed errors in development & user-friendly errors in production). Currently used for each route/page in `App.jsx`
  - Introduced `VITE_ENV` environment variable, used by `ErrorBoundary` and for future use.

## [1.0.1] - 2025-04-14

### Changed

- Fixed build-time errors and general cleanup:
  - Removed all facade import structures to resolve madge circular dependency warnings
  - Replaced CommonJS usage of `react-quill-blot-formatter-mobile` with ESM-compatible solution
  - Introduced alias for `/src` folder and updated all import statements accordingly
  - Removed unused package `quill-image-resize-module-react`
  - Added vercel.json to fix Vercel 404 page error after page refresh
  - `PreLoaderProvider`: replaced direct `children` destructure to avoid hot reload crash.

## [1.0.0] - 2025-04-12

### Initial Release

- Fully developed and uploaded
- Built with Vite + React
