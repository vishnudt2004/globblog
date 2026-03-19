# Changelog

All notable changes to this project will be documented in this file (Backend).

## [1.0.2] - 2026-03-19

### Security

- Resolved vulnerabilities via `npm audit fix`.
- Resolved 2 remaining high-severity vulnerabilities in `tar` (GHSA-34x7-hfp2-rc4v et al.)
  transitively via `bcrypt > @mapbox/node-pre-gyp` — forced `tar@^7.5.11` via
  `package.json` overrides as a manual fix.
  Remove override once `bcrypt` updates `@mapbox/node-pre-gyp` past `1.0.11`.

### Known Limitations

- Nodemailer (SMTP) retained for email delivery. Note: SMTP may not function
  on Render's hosting environment; acceptable for portfolio/demo use.
  switch port from 465 to 587.

## [1.0.1] - 2025-04-14

### Changed

- New Feature - Seed Data
  - Refactored `SeedData.js` logic and extracted it into `seedActions.js` for better separation of concerns.
  - Introduced new environment variables to control the data seeding process:
    - `INITIAL_SEED`: Set to true to enable the data seeding on startup.
    - `INITIAL_SEED_ACTION`: Define which seeding action to perform.
      - Supported values: WipeUsers, WipeBlogs, SeedUsers, SeedBlogs, WipeAndSeedAll

## [1.0.0] - 2025-04-12

### Initial Release

- Fully developed and uploaded
- Built with Node.js + Express
