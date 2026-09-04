import { Service, Signal, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardTableData } from './dashboard-table-data';

@Service()
/** Owns the in-memory runner state shared by dashboard controls. */
export default class DashboardStateService {
  private readonly newRunnerRequests = new Subject<void>();

  /** Emits whenever a consumer asks to open the new-runner registration flow. */
  readonly newRunnerRequested$ = this.newRunnerRequests.asObservable();

  private readonly runnersState = signal<DashboardTableData[]>([]);

  /** Read-only signal containing runners currently displayed by the dashboard. */
  readonly runners: Signal<DashboardTableData[]> = this.runnersState.asReadonly();

  /** Emits a request for the dashboard coordinator to open the registration dialog. */
  requestNewRunner(): void {
    this.newRunnerRequests.next();
  }

  /**
   * Appends a completed runner registration to the leaderboard state.
   *
   * @param runner The runner record to add to the leaderboard.
   */
  addRunner(runner: DashboardTableData): void {
    this.runnersState.update((runners) => [...runners, runner]);
  }
}
