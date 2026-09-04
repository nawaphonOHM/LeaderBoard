import { Component, injectAsync } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-add-new-runner-button',
  imports: [MatButton],
  templateUrl: './dashboard-add-new-runner-button.component.html',
  styleUrl: './dashboard-add-new-runner-button.component.scss',
})
/** Publishes the user's request to register a new leaderboard runner. */
export class DashboardAddNewRunnerButtonComponent {
  private readonly dashboardStateToken = injectAsync(() => import('../dashboard-state.service'));

  /** Notifies the dashboard coordinator that the registration dialog should open. */
  async askForNewRunner(): Promise<void> {
    const dashboardState = await this.dashboardStateToken();
    dashboardState.requestNewRunner();
  }
}
