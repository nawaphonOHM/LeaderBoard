import { Component } from '@angular/core';
import { MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-dashboard-header',
  imports: [MatCardTitle],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {}
