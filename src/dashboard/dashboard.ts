import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';
import {DashboardTable} from '../dashboard-table/dashboard-table';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader,
    DashboardTable
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
