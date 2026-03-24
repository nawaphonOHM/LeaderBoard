[![Node.js CI](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml/badge.svg)](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Running Leaderboard

A web application designed to track and display a leaderboard for runners. Built with **Angular 21** and **Nx 22**, it features a clean and modern dashboard using **Angular Material 21**.

## Features

- **Dashboard**: View a sorted leaderboard of runners with their rank, full name, nationality, and time.
- **Add New Runner**: Integrated form to register new runners with ease.
- **Sorting and Formatting**: Automatic sorting by finish time (ascending) and custom pipes for:
  - Full Name: Displays first and last name combined.
  - Time Formatting: Converts milliseconds into a readable `mm:ss.SSS` format.
- **Nationalities Support**: Built-in support for country flags using `flagsapi.com` and `@wlucha/ng-country-select`.
- **Responsive Layout**: Designed to look great on various screen sizes using Angular Material's grid and card components.

## Tech Stack

- **Framework**: [Angular 21](https://angular.dev/)
- **Monorepo Management**: [Nx 22](https://nx.dev/)
- **UI Components**: [Angular Material 21](https://material.angular.io/)
- **State Management**: Angular Signals (used for component communication).
- **Styling**: SCSS (pre-compiled to CSS).
- **Third-party Libraries**:
  - `rxjs`: For reactive data flows.
  - `@wlucha/ng-country-select`: For selecting runner nationalities.
  - `flag-icons`: For displaying country flags in the selection dropdown.
  - `flagsapi.com`: For providing country flags in the leaderboard table.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository.
2. Install the project dependencies:
   ```bash
   npm install
   ```

### Development Server

To start a local development server, run:

```bash
npm start
```

Once the server is running, navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you modify any source files.

### Building

To build the project for production, run:

```bash
npm run build
```

The compiled build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

To execute the project's unit tests using Nx and Karma, run:

```bash
npm test
```

## Project Structure

- `src/dashboard`: Root container for the leaderboard view.
  - `dashboard.component.ts`: Main entry point for the dashboard UI.
  - `dashboard-header`: Dashboard header component.
  - `dashboard-add-new-runner-coordinator`: Orchestrates runner addition and table updates.
    - `dashboard-add-new-runner-button`: Triggers the registration dialog.
    - `dashboard-table`: Displays sorted runner data using `MatTable`.
    - `new-runner-register`: Form for new runner registration.
      - `general-input`: Reusable input field component.
      - `time-used-for-finnish-running`: Specialized input for recording runner completion time.
- `src/services`: Communication services using Angular Signals (Radio Tower pattern).
- `src/pipes`: Custom data transformation pipes.
  - `full-name.pipe.ts`: Combines runner's first and last name (`FullNamePipe`).
  - `time-min-second-milli-second.pipe.ts`: Formats time in milliseconds to a readable string (`TimeMinSecondMilliSecondPipe`).
- `src/interfaces`: TypeScript interfaces for data modeling and communication envelopes.
- `src/variables`: Configuration constants (e.g., flag APIs) and shared time units.
- `src/errors`: Custom error types for enhanced debugging.
