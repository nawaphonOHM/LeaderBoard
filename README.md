[![Node.js CI](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml/badge.svg)](https://github.com/nawaphonOHM/LeaderBoard/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Running Leaderboard

A web application designed to track and display a leaderboard for runners. Built with **Angular 22** and **Nx 23**, it features a clean and modern dashboard using **Angular Material 22**.

## Demo

<video src="assets/videos/leaderboard-e2e.webm" width="100%" controls autoplay loop muted playsinline>
  Your browser does not support the video tag.
</video>

## Features

- **Dashboard**: View a sorted leaderboard of runners with their rank, full name, nationality, and time.
- **Add New Runner**: Model-driven Angular Signal Form for registering runners with declarative validation for names, nationality, and finish time.
- **Signal Forms**: Uses Angular 22's `@angular/forms/signals` API for fine-grained form state, automatic validation, and signal-based submission handling.
- **Sorting and Formatting**: Automatic sorting by finish time (ascending) and custom pipes for:
  - Full Name: Displays first and last name combined.
  - Time Formatting: Converts milliseconds into a readable `mm:ss.SSS` format.
- **Nationalities Support**: Built-in support for country flags using `flagsapi.com` and `@wlucha/ng-country-select`.
- **Responsive Layout**: Designed to look great on various screen sizes using Angular Material's grid and card components.
- **Automated End-to-End Testing**: Comprehensive test suite with [Playwright](https://playwright.dev/) verifying all core user flows, form validations, sorting behavior, and video recordings.

## Tech Stack

- **Framework**: [Angular 22](https://angular.dev/)
- **Monorepo Management**: [Nx 23](https://nx.dev/)
- **UI Components**: [Angular Material 22](https://material.angular.io/)
- **Forms and State Management**: Angular Signals and Angular 22 Signal Forms (`@angular/forms/signals`) for model-driven form state and validation; RxJS for one-time UI commands.
- **E2E Testing**: [Playwright](https://playwright.dev/) (`@playwright/test`) with Page Object Model architecture and video recording.
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

For a single non-watching run in headless Chrome:

```bash
npm run test:no-watch
```

### Running End-to-End (E2E) Tests

End-to-End tests are built using **Playwright** and validate user flows such as initial dashboard loading, form validations, dialog cancellation, runner creation, and automatic leaderboard table sorting.

To run the full E2E test suite:

```bash
npm run e2e
# or via Nx directly
npm exec nx e2e LeaderBoard
```

Playwright will automatically launch the Angular dev server on `http://localhost:4200` via its `webServer` configuration.

#### Interactive UI Mode

To run Playwright in interactive UI mode for visual debugging:

```bash
npm run e2e:ui
# or via Nx directly
npm exec nx e2e LeaderBoard --configuration=ui
```

#### Viewing Test Reports

To view the generated HTML test report:

```bash
npm run e2e:report
# or
npx playwright show-report
```

#### Video Recordings

Playwright is configured with `video: 'on'` to record video files of all test executions.

- Generated test videos are stored in `test-results/<test-name>/video.webm`.
- A showcase demo video is preserved under `assets/videos/leaderboard-e2e.webm`.

## Project Structure

- `src/dashboard`: Root container for the leaderboard view.
  - `dashboard.component.ts`: Main entry point for the dashboard UI.
  - `dashboard-header`: Dashboard header component.
  - `dashboard-add-new-runner-coordinator`: Orchestrates runner addition and table updates.
    - `dashboard-state.service.ts`: Shared runner state and one-time registration requests.
    - `dashboard-table-data.ts`: Shared runner data model (`DashboardTableData`).
    - `time-unit.ts`: Shared time unit used across the coordinator's children.
    - `dashboard-add-new-runner-button`: Triggers the registration dialog.
    - `dashboard-table`: Displays sorted runner data using `MatTable`.
      - `full-name.pipe.ts`: Combines runner's first and last name (`FullNamePipe`).
      - `time-min-second-milli-second.pipe.ts`: Formats time in milliseconds to a readable string (`TimeMinSecondMilliSecondPipe`).
    - `new-runner-register`: Signal Form for new runner registration, built from a writable `runnerModel` and its `runnerForm` field tree.
      - `configurations.ts`: Configuration constants (e.g., flag APIs).
      - `time-used-for-finnish-running-event.ts`: Event contract for a completed run.
      - `general-input`: Reusable `FieldTree<string>` input component bound with the Signal Forms `[formField]` directive.
      - `time-used-for-finnish-running`: Specialized Signal Form for recording runner completion time; derives milliseconds through an `effect()` and emits validity updates.
        - `time.ts`: Time-related type used by the completion time input.
- `e2e`: End-to-End test suites using Playwright.
  - `pages/leaderboard.page.ts`: Page Object Model encapsulating dashboard locators and actions.
  - `specs/leaderboard-initial-state.spec.ts`: Tests header display and empty leaderboard state.
  - `specs/runner-registration-validation.spec.ts`: Tests form validation rules, bounds checks, and dialog cancellation.
  - `specs/runner-registration-sorting.spec.ts`: Tests runner addition, formatting, and ascending leaderboard sorting.
- `assets/videos`: Contains recorded demonstration videos (`leaderboard-e2e.webm`).
