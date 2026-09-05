import { test, expect } from '@playwright/test';
import { LeaderboardPage } from '../pages/leaderboard.page';

test.describe('Runner Registration - Form Validation & Interactions', () => {
  let leaderboardPage: LeaderboardPage;

  test.beforeEach(async ({ page }) => {
    leaderboardPage = new LeaderboardPage(page);
    await leaderboardPage.navigate();
  });

  test('should open registration dialog with correct title and disabled Save button by default', async () => {
    await leaderboardPage.openAddRunnerDialog();

    await expect(leaderboardPage.dialog).toBeVisible();
    await expect(leaderboardPage.dialogTitle).toHaveText('Add runner who finished the race');
    await expect(leaderboardPage.saveButton).toBeDisabled();
    await expect(leaderboardPage.cancelButton).toBeEnabled();
  });

  test('should display required validation errors when First Name and Last Name are blurred without input', async () => {
    await leaderboardPage.openAddRunnerDialog();

    // Trigger touched state on First Name
    await leaderboardPage.focusAndBlur(leaderboardPage.firstNameInput);
    const firstNameError = leaderboardPage.getValidationError('Enter a first name');
    await expect(firstNameError).toBeVisible();

    // Trigger touched state on Last Name
    await leaderboardPage.focusAndBlur(leaderboardPage.lastNameInput);
    const lastNameError = leaderboardPage.getValidationError('Enter a last name');
    await expect(lastNameError).toBeVisible();

    // Save button must remain disabled
    await expect(leaderboardPage.saveButton).toBeDisabled();
  });

  test('should show error when non-numeric or pattern-invalid values are entered into time inputs', async () => {
    await leaderboardPage.openAddRunnerDialog();

    // Fill non-numeric value in minutes
    await leaderboardPage.minutesInput.fill('abc');
    await leaderboardPage.minutesInput.blur();
    const patternErrorMinutes = leaderboardPage.getValidationError('Enter a whole number.');
    await expect(patternErrorMinutes).toBeVisible();

    // Save button must remain disabled
    await expect(leaderboardPage.saveButton).toBeDisabled();
  });

  test('should validate Seconds range (0 to 59) and display error message for out-of-bounds values', async () => {
    await leaderboardPage.openAddRunnerDialog();

    // Enter out-of-bounds seconds (e.g. 60 or 65)
    await leaderboardPage.secondsInput.fill('65');
    await leaderboardPage.secondsInput.blur();

    const secondsError = leaderboardPage.getValidationError(
      'You entered invalid seconds. Seconds must be between 0 and 59.',
    );
    await expect(secondsError).toBeVisible();
    await expect(leaderboardPage.saveButton).toBeDisabled();

    // Clear and enter valid seconds (e.g. 59)
    await leaderboardPage.secondsInput.fill('59');
    await leaderboardPage.secondsInput.blur();
    await expect(secondsError).toBeHidden();
  });

  test('should validate Milliseconds range (0 to 999) and display error message for out-of-bounds values', async () => {
    await leaderboardPage.openAddRunnerDialog();

    // Enter out-of-bounds milliseconds (e.g. 1000 or 1050)
    await leaderboardPage.millisecondsInput.fill('1050');
    await leaderboardPage.millisecondsInput.blur();

    const millisecondsError = leaderboardPage.getValidationError(
      'You entered invalid milliseconds. Milliseconds must be between 0 and 999.',
    );
    await expect(millisecondsError).toBeVisible();
    await expect(leaderboardPage.saveButton).toBeDisabled();

    // Clear and enter valid milliseconds (e.g. 999)
    await leaderboardPage.millisecondsInput.fill('999');
    await leaderboardPage.millisecondsInput.blur();
    await expect(millisecondsError).toBeHidden();
  });

  test('should enable Save button when all required and time fields are valid', async () => {
    await leaderboardPage.openAddRunnerDialog();
    await expect(leaderboardPage.saveButton).toBeDisabled();

    // Fill valid data
    await leaderboardPage.fillRunnerDetails({
      firstName: 'Eliud',
      lastName: 'Kipchoge',
      country: 'Kenya',
      minutes: 2,
      seconds: 1,
      milliseconds: 90,
    });

    // Save button must now be enabled
    await expect(leaderboardPage.saveButton).toBeEnabled();

    // Validation errors should not be present
    const errors = await leaderboardPage.getValidationErrors();
    expect(errors.length).toBe(0);
  });

  test('should close dialog without altering leaderboard table when Cancel is clicked', async () => {
    await leaderboardPage.openAddRunnerDialog();

    // Partially fill form
    await leaderboardPage.firstNameInput.fill('Temporary');
    await leaderboardPage.lastNameInput.fill('Runner');

    // Click Cancel
    await leaderboardPage.cancelRunnerDialog();

    // Verify dialog is hidden
    await expect(leaderboardPage.dialog).toBeHidden();

    // Verify table remains empty
    await expect(leaderboardPage.emptyTableMessage).toBeVisible();
    await expect(leaderboardPage.emptyTableMessage).toHaveText('No runners have been added yet.');
    const rowCount = await leaderboardPage.getTableRowCount();
    expect(rowCount).toBe(0);
  });
});
