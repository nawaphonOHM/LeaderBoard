import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';
import {DashboardTable} from '../dashboard-table/dashboard-table';
import {DashboardAddNewRunnerButton} from '../dashboard-add-new-runner-button/dashboard-add-new-runner-button';
import {
  DashboardAddNewRunnerCoordinator
} from '../dashboard-add-new-runner-coordinator/dashboard-add-new-runner-coordinator';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader,
    DashboardTable,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    DashboardAddNewRunnerButton,
    DashboardAddNewRunnerCoordinator
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
