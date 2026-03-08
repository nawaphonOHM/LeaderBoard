# Running Leaderboard

A web application designed to track and display a leaderboard for runners. Built with **Angular 21** and **Nx 22**, it features a clean and modern dashboard using **Angular Material**.

## Features

- **Dashboard**: View a sorted leaderboard of runners with their rank, full name, nationality, and time.
- **Add New Runner**: Integrated form to register new runners with ease.
- **Sorting and Formatting**: Automatic sorting by finish time (ascending) and custom pipes for:
  - Full Name: Displays first and last name combined.
  - Time Formatting: Converts milliseconds into a readable `mm:ss:SSS` format.
- **Nationalities Support**: Built-in support for country flags using `flag-icons` and `@wlucha/ng-country-select`.
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
  - `flag-icons`: For displaying country flags.

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

- `src/dashboard`: Main container for the leaderboard.
- `src/dashboard-table`: Component for displaying runner data in a table.
- `src/new-runner-register`: Registration form for new runners.
- `src/services`: Communication services (e.g., `DashBoardAddNewRunnerCoordinatorRadioTower`).
- `src/pipes`: Custom data transformation pipes for names and time formatting.
- `src/interfaces`: TypeScript interfaces for data models.
