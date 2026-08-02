import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DashboardStateService } from '../dashboard-state.service';

@Component({
  selector: 'app-dashboard-add-new-runner-button',
  imports: [MatButton],
  templateUrl: './dashboard-add-new-runner-button.component.html',
  styleUrl: './dashboard-add-new-runner-button.component.scss',
})
/** Publishes the user's request to register a new leaderboard runner. */
export class DashboardAddNewRunnerButtonComponent {
  private readonly dashboardState = inject(DashboardStateService);

  /** Notifies the dashboard coordinator that the registration dialog should open. */
  askForNewRunner(): void {
    this.dashboardState.requestNewRunner();
  }
}
