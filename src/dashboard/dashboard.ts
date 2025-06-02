import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';
import {DashboardTable} from '../dashboard-table/dashboard-table';
import {DashboardAddNewRunnerButton} from '../dashboard-add-new-runner-button/dashboard-add-new-runner-button';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader,
    DashboardTable,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    DashboardAddNewRunnerButton
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
