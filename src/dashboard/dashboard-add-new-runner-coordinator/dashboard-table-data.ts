/** A runner row rendered by the dashboard leaderboard table. */
export interface DashboardTableData {
  /** Runner's given name. */
  firstName: string;

  /** Runner's family name. */
  lastName: string;

  /** URL of the flag image representing the runner's nationality. */
  nationalityUrlImage: string;

  /** Runner's finish time, measured in milliseconds. */
  timeUsedInMillisecond: number;
}
