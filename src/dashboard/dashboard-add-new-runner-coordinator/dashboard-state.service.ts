import { Injectable, Signal, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardTableData } from './dashboard-table-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private readonly newRunnerRequests = new Subject<void>();
  readonly newRunnerRequested$ = this.newRunnerRequests.asObservable();

  private readonly runnersState = signal<DashboardTableData[]>([]);
  readonly runners: Signal<DashboardTableData[]> = this.runnersState.asReadonly();

  requestNewRunner(): void {
    this.newRunnerRequests.next();
  }

  addRunner(runner: DashboardTableData): void {
    this.runnersState.update((runners) => [...runners, runner]);
  }
}
