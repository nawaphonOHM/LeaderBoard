import { expect, Locator, Page } from '@playwright/test';

export interface RunnerData {
  firstName: string;
  lastName: string;
  country: string;
  minutes: string | number;
  seconds: string | number;
  milliseconds: string | number;
}

export interface TableRowData {
  rank: string;
  fullName: string;
  flagSrc: string | null;
  time: string;
}

/**
 * Page Object Model for the Running Leaderboard application.
 * Encapsulates locators and user interactions for the dashboard and runner registration dialog.
 */
export class LeaderboardPage {
  readonly page: Page;

  // Dashboard Header & Controls
  readonly headerTitle: Locator;
  readonly addRunnerButton: Locator;

  // Table
  readonly table: Locator;
  readonly tableHeaderRow: Locator;
  readonly tableRows: Locator;
  readonly emptyTableMessage: Locator;

  // Registration Dialog
  readonly dialog: Locator;
  readonly dialogTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly countrySelect: Locator;
  readonly countryInput: Locator;
  readonly minutesInput: Locator;
  readonly secondsInput: Locator;
  readonly millisecondsInput: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & dashboard locators
    this.headerTitle = page.locator('mat-card-title');
    this.addRunnerButton = page.getByRole('button', { name: 'Add Runner' });

    // Table locators
    this.table = page.locator('table[mat-table]');
    this.tableHeaderRow = page.locator('tr[mat-header-row]');
    this.tableRows = page.locator('tr[mat-row]');
    this.emptyTableMessage = page.locator('tr.mat-row td.mat-cell');

    // Dialog locators
    this.dialog = page.locator('mat-dialog-container');
    this.dialogTitle = page.locator('[mat-dialog-title]');
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.countrySelect = page.locator('ng-country-select');
    this.countryInput = page.locator('ng-country-select input');
    this.minutesInput = page.getByLabel('Time used (minutes)');
    this.secondsInput = page.getByLabel('Time used (seconds)');
    this.millisecondsInput = page.getByLabel('Time used (milliseconds)');
    this.cancelButton = page.locator('mat-dialog-actions button', { hasText: 'Cancel' });
    this.saveButton = page.locator('mat-dialog-actions button', { hasText: 'Save' });
    this.validationErrors = page.locator('mat-error');
  }

  /** Navigates to the root URL of the application. */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /** Clicks the 'Add Runner' button and waits for the dialog to be visible. */
  async openAddRunnerDialog(): Promise<void> {
    await this.addRunnerButton.click();
    await expect(this.dialog).toBeVisible();
  }

  /** Selects a country from the ng-country-select autocomplete dropdown. */
  async selectCountry(countryName: string): Promise<void> {
    await this.countryInput.fill(countryName);
    const exactOption = this.page.getByRole('option', { name: countryName, exact: true });
    if ((await exactOption.count()) > 0) {
      await exactOption.first().click();
    } else {
      const option = this.page.getByRole('option', { name: countryName, exact: false }).first();
      await expect(option).toBeVisible();
      await option.click();
    }
  }

  /** Fills the runner registration form fields. */
  async fillRunnerDetails(runner: Partial<RunnerData>): Promise<void> {
    if (runner.firstName !== undefined) {
      await this.firstNameInput.fill(runner.firstName);
    }
    if (runner.lastName !== undefined) {
      await this.lastNameInput.fill(runner.lastName);
    }
    if (runner.country !== undefined) {
      await this.selectCountry(runner.country);
    }
    if (runner.minutes !== undefined) {
      await this.minutesInput.fill(String(runner.minutes));
    }
    if (runner.seconds !== undefined) {
      await this.secondsInput.fill(String(runner.seconds));
    }
    if (runner.milliseconds !== undefined) {
      await this.millisecondsInput.fill(String(runner.milliseconds));
    }
  }

  /** Focuses and then blurs an input element to trigger touch validation. */
  async focusAndBlur(locator: Locator): Promise<void> {
    await locator.focus();
    await locator.blur();
  }

  /** Clicks the Save button and waits for the dialog to close. */
  async submitRunner(): Promise<void> {
    await this.saveButton.click();
    await expect(this.dialog).toBeHidden();
  }

  /** Clicks the Cancel button and waits for the dialog to close. */
  async cancelRunnerDialog(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.dialog).toBeHidden();
  }

  /** Full flow to add a runner from opening dialog to submitting. */
  async addRunner(runner: RunnerData): Promise<void> {
    await this.openAddRunnerDialog();
    await this.fillRunnerDetails(runner);
    await this.submitRunner();
  }

  /** Checks if the Save button in the dialog is disabled. */
  async isSaveButtonDisabled(): Promise<boolean> {
    return await this.saveButton.isDisabled();
  }

  /** Returns the count of runner data rows in the leaderboard table. */
  async getTableRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  /** Returns the locator for a specific table row by index. */
  getTableRow(index: number): Locator {
    return this.tableRows.nth(index);
  }

  /** Extracts cell data for a specific table row. */
  async getTableRowData(index: number): Promise<TableRowData> {
    const row = this.getTableRow(index);
    const cells = row.locator('td');
    const rank = (await cells.nth(0).textContent())?.trim() ?? '';
    const fullName = (await cells.nth(1).textContent())?.trim() ?? '';
    const flagImg = cells.nth(2).locator('img');
    const flagSrc = (await flagImg.count()) > 0 ? await flagImg.getAttribute('src') : null;
    const time = (await cells.nth(3).textContent())?.trim() ?? '';

    return { rank, fullName, flagSrc, time };
  }

  /** Extracts cell data for all table rows. */
  async getAllTableRowsData(): Promise<TableRowData[]> {
    const count = await this.getTableRowCount();
    const rows: TableRowData[] = [];
    for (let i = 0; i < count; i++) {
      rows.push(await this.getTableRowData(i));
    }
    return rows;
  }

  /** Returns the text content of the empty table placeholder row. */
  async getEmptyTableMessage(): Promise<string> {
    return (await this.emptyTableMessage.textContent())?.trim() ?? '';
  }

  /** Returns all currently visible validation error texts. */
  async getValidationErrors(): Promise<string[]> {
    const count = await this.validationErrors.count();
    const errors: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.validationErrors.nth(i).textContent();
      if (text) {
        errors.push(text.trim());
      }
    }
    return errors;
  }

  /** Returns locator for a specific validation error message. */
  getValidationError(text: string | RegExp): Locator {
    return this.page.locator('mat-error', { hasText: text });
  }
}
