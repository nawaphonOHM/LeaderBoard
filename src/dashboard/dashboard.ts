import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';
import {DashboardTable} from '../dashboard-table/dashboard-table';
import {DashboardAddNewRunner} from '../dashboard-add-new-runner/dashboard-add-new-runner';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader,
    DashboardTable,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    DashboardAddNewRunner
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
