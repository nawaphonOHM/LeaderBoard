import { test, expect } from '@playwright/test';
import { LeaderboardPage } from '../pages/leaderboard.page';

test.describe('Runner Registration & Leaderboard Sorting', () => {
  let leaderboardPage: LeaderboardPage;

  test.beforeEach(async ({ page }) => {
    leaderboardPage = new LeaderboardPage(page);
    await leaderboardPage.navigate();
  });

  test('should successfully register a single runner and display correctly formatted row', async () => {
    await leaderboardPage.addRunner({
      firstName: 'Eliud',
      lastName: 'Kipchoge',
      country: 'Kenya',
      minutes: 2,
      seconds: 1,
      milliseconds: 90,
    });

    // Verify empty state is gone
    await expect(leaderboardPage.emptyTableMessage).toBeHidden();

    // Verify table row count is 1
    const rowCount = await leaderboardPage.getTableRowCount();
    expect(rowCount).toBe(1);

    // Verify row contents
    const rowData = await leaderboardPage.getTableRowData(0);
    expect(rowData.rank).toBe('1');
    expect(rowData.fullName).toBe('Eliud Kipchoge');
    expect(rowData.flagSrc).toContain('https://flagsapi.com/KE/flat/32.png');
    expect(rowData.time).toBe('2:01.090');

    // Verify flag image alt text
    const flagImg = leaderboardPage.getTableRow(0).locator('td').nth(2).locator('img');
    await expect(flagImg).toHaveAttribute('alt', 'Runner nationality flag');
  });

  test('should automatically sort multiple runners in ascending order by finish time', async () => {
    // Add Runner 1: Slow runner (5 minutes)
    await leaderboardPage.addRunner({
      firstName: 'Runner',
      lastName: 'Slow',
      country: 'United States of America',
      minutes: 5,
      seconds: 0,
      milliseconds: 0,
    });

    // Add Runner 2: Fast runner (1 minute 30.5 seconds)
    await leaderboardPage.addRunner({
      firstName: 'Runner',
      lastName: 'Fast',
      country: 'Japan',
      minutes: 1,
      seconds: 30,
      milliseconds: 500,
    });

    // Add Runner 3: Medium runner (3 minutes 15.2 seconds)
    await leaderboardPage.addRunner({
      firstName: 'Runner',
      lastName: 'Medium',
      country: 'Germany',
      minutes: 3,
      seconds: 15,
      milliseconds: 200,
    });

    // Verify row count is 3
    const rowCount = await leaderboardPage.getTableRowCount();
    expect(rowCount).toBe(3);

    // Extract all rows
    const rows = await leaderboardPage.getAllTableRowsData();

    // Row 1 should be the fastest (Runner Fast)
    expect(rows[0].rank).toBe('1');
    expect(rows[0].fullName).toBe('Runner Fast');
    expect(rows[0].flagSrc).toContain('/JP/');
    expect(rows[0].time).toBe('1:30.500');

    // Row 2 should be the medium (Runner Medium)
    expect(rows[1].rank).toBe('2');
    expect(rows[1].fullName).toBe('Runner Medium');
    expect(rows[1].flagSrc).toContain('/DE/');
    expect(rows[1].time).toBe('3:15.200');

    // Row 3 should be the slowest (Runner Slow)
    expect(rows[2].rank).toBe('3');
    expect(rows[2].fullName).toBe('Runner Slow');
    expect(rows[2].flagSrc).toContain('/US/');
    expect(rows[2].time).toBe('5:00.000');
  });

  test('should reposition existing runners when a new fastest runner is added', async () => {
    // Add baseline runners
    await leaderboardPage.addRunner({
      firstName: 'Second',
      lastName: 'Place',
      country: 'Kenya',
      minutes: 2,
      seconds: 0,
      milliseconds: 0,
    });

    await leaderboardPage.addRunner({
      firstName: 'Third',
      lastName: 'Place',
      country: 'France',
      minutes: 4,
      seconds: 0,
      milliseconds: 0,
    });

    // Add new fastest runner (45.100s)
    await leaderboardPage.addRunner({
      firstName: 'First',
      lastName: 'Place',
      country: 'Canada',
      minutes: 0,
      seconds: 45,
      milliseconds: 100,
    });

    const rows = await leaderboardPage.getAllTableRowsData();
    expect(rows.length).toBe(3);

    expect(rows[0].rank).toBe('1');
    expect(rows[0].fullName).toBe('First Place');
    expect(rows[0].flagSrc).toContain('/CA/');
    expect(rows[0].time).toBe('0:45.100');

    expect(rows[1].rank).toBe('2');
    expect(rows[1].fullName).toBe('Second Place');
    expect(rows[1].flagSrc).toContain('/KE/');
    expect(rows[1].time).toBe('2:00.000');

    expect(rows[2].rank).toBe('3');
    expect(rows[2].fullName).toBe('Third Place');
    expect(rows[2].flagSrc).toContain('/FR/');
    expect(rows[2].time).toBe('4:00.000');
  });
});
