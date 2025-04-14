# Changelog

All notable changes to this project will be documented in this file (Backend).

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
