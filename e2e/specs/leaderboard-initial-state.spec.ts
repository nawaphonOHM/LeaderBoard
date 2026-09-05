import { test, expect } from '@playwright/test';
import { LeaderboardPage } from '../pages/leaderboard.page';

test.describe('Leaderboard - Initial State', () => {
  let leaderboardPage: LeaderboardPage;

  test.beforeEach(async ({ page }) => {
    leaderboardPage = new LeaderboardPage(page);
    await leaderboardPage.navigate();
  });

  test('should display the header with "Running Leaderboard" title', async () => {
    await expect(leaderboardPage.headerTitle).toBeVisible();
    await expect(leaderboardPage.headerTitle).toHaveText('Running Leaderboard');
  });

  test('should display the "Add Runner" action button', async () => {
    await expect(leaderboardPage.addRunnerButton).toBeVisible();
    await expect(leaderboardPage.addRunnerButton).toBeEnabled();
    await expect(leaderboardPage.addRunnerButton).toHaveText('Add Runner');
  });

  test('should display table headers and empty state placeholder when no runners are present', async () => {
    await expect(leaderboardPage.table).toBeVisible();

    // Verify column headers
    const headerCells = leaderboardPage.tableHeaderRow.locator('th');
    await expect(headerCells).toHaveCount(4);
    await expect(headerCells.nth(0)).toHaveText('No.');
    await expect(headerCells.nth(1)).toHaveText('Full Name');
    await expect(headerCells.nth(2)).toHaveText('Nationality');
    await expect(headerCells.nth(3)).toContainText('Time');

    // Verify empty state message
    await expect(leaderboardPage.emptyTableMessage).toBeVisible();
    await expect(leaderboardPage.emptyTableMessage).toHaveText('No runners have been added yet.');

    // Verify table has 0 data rows
    const rowCount = await leaderboardPage.getTableRowCount();
    expect(rowCount).toBe(0);
  });
});
