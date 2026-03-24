import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardTableComponent } from './dashboard-add-new-runner-coordinator/dashboard-table/dashboard-table.component';
import { DashboardAddNewRunnerButtonComponent } from './dashboard-add-new-runner-coordinator/dashboard-add-new-runner-button/dashboard-add-new-runner-button.component';
import { DashboardAddNewRunnerCoordinatorComponent } from './dashboard-add-new-runner-coordinator/dashboard-add-new-runner-coordinator.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeaderComponent,
    DashboardTableComponent,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    DashboardAddNewRunnerButtonComponent,
    DashboardAddNewRunnerCoordinatorComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
