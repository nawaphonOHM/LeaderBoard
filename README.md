[![Node.js CI](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml/badge.svg)](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

# LeaderBoard

A simple web application for tracking and displaying a leaderboard for runners. Built with Angular and Nx, with a responsive dashboard using Angular Material.

## Features

- Dashboard: View a sorted leaderboard of runners with rank, full name, nationality, and time.
- Add New Runner: Integrated form to register new runners.
- Sorting and Formatting: Automatic sorting by finish time (ascending) and custom pipes for:
  - Full Name: Displays first and last name combined.
  - Time Formatting: Converts milliseconds into a readable `mm:ss.SSS` format.
- Nationalities Support: Country flags displayed using an external flags API and a country-select library.
- Responsive Layout: Designed to look great on various screen sizes using Angular Material components.

## Tech Stack

- Framework: Angular
- Monorepo Management: Nx
- UI Components: Angular Material
- State Management: Angular Signals
- Styling: SCSS
- Third-party Libraries:
  - `rxjs`
  - `@wlucha/ng-country-select`
  - `flag-icons`
  - `flagsapi.com`

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (or pnpm/yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nawaphonOHM/LeaderBoard.git
cd LeaderBoard
```

2. Install dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm start
```

Note: The app runs on http://localhost:4200 by default. If this project is managed with Nx, you may also use `nx serve` for workspace-aware commands.

### Building

Build for production:

```bash
npm run build
```

The compiled artifacts will be stored in `dist/`.

### Running Tests

Run unit tests:

```bash
npm test
```

## Usage

- Open http://localhost:4200 in your browser.
- Use the Dashboard to view runners, add a new runner with the Add button, and observe automatic sorting by time.

## Project Structure

- `src/dashboard`: Leaderboard UI and related components.
  - `dashboard.component.ts`
  - `dashboard-header`
  - `dashboard-add-new-runner-coordinator`
  - `dashboard-table`
  - `new-runner-register`
- `src/services`: Communication services and state management.
- `src/pipes`: Custom transformation pipes (`FullNamePipe`, `TimeMinSecondMilliSecondPipe`).
- `src/interfaces`: TypeScript interfaces for data models.
- `src/variables`: Configuration constants.
- `src/errors`: Custom error types.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request. If you plan larger changes, open an issue first to discuss the approach.

## Screenshots / Demo

_Add screenshots or a demo link here._

## License

This project is provided under the MIT License. See the LICENSE file for details.
