import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DashboardStateService } from '../dashboard-state.service';

@Component({
  selector: 'app-dashboard-add-new-runner-button',
  imports: [MatButton],
  templateUrl: './dashboard-add-new-runner-button.component.html',
  styleUrl: './dashboard-add-new-runner-button.component.scss',
})
export class DashboardAddNewRunnerButtonComponent {
  private readonly dashboardState = inject(DashboardStateService);

  askForNewRunner(): void {
    this.dashboardState.requestNewRunner();
  }
}
