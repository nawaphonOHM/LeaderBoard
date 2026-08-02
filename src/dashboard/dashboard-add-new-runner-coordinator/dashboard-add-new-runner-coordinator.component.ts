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
export class DashboardAddNewRunnerCoordinatorComponent {
  private readonly dashboardState = inject(DashboardStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly matDialog = inject(MatDialog);

  constructor() {
    this.dashboardState.newRunnerRequested$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => void this.openNewRunnerDialog());
  }

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
