import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {DashboardHeader} from '../dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    DashboardHeader
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
