import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';
import {DashboardTable} from '../dashboard-table/dashboard-table';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader,
    DashboardTable,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
