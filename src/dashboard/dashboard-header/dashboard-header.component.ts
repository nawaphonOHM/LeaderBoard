import { Component } from '@angular/core';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-dashboard-header',
  imports: [MatCardTitle],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
/** Displays the title and supporting content for the leaderboard card. */
export class DashboardHeaderComponent {}
