import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DashboardTableData } from './dashboard-table-data';
import { DashboardStateService } from './dashboard-state.service';
import type { NewRunnerRegisterComponent as NewRunnerRegisterComponentType } from './new-runner-register/new-runner-register.component';

@Component({
  selector: 'app-dashboard-add-new-runner-coordinator',
  imports: [],
  templateUrl: './dashboard-add-new-runner-coordinator.component.html',
  styleUrl: './dashboard-add-new-runner-coordinator.component.scss',
})
/** Coordinates runner-registration requests and the registration dialog. */
export class DashboardAddNewRunnerCoordinatorComponent {
  private readonly dashboardState = inject(DashboardStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly matDialog = inject(MatDialog);

  /** Subscribes to registration requests for the lifetime of this component. */
  constructor() {
    this.dashboardState.newRunnerRequested$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => void this.openNewRunnerDialog());
  }

  /**
   * Opens the lazy-loaded registration dialog and stores a submitted runner.
   *
   * @remarks
   * Closing the dialog without saving produces no state change.
   *
   * @returns A promise that settles after the dialog result has been handled.
   */
  async openNewRunnerDialog(): Promise<void> {
    const { NewRunnerRegisterComponent } =
      await import('./new-runner-register/new-runner-register.component');

    const result = await firstValueFrom(
      this.matDialog
        .open<NewRunnerRegisterComponentType, undefined, DashboardTableData>(
          NewRunnerRegisterComponent,
          { disableClose: true },
        )
        .afterClosed(),
    );

    if (result !== undefined) {
      this.dashboardState.addRunner(result);
    }
  }
}
