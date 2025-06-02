import { Component } from '@angular/core';
import {MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-dashboard-header',
    imports: [
        MatCardTitle
    ],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.scss'
})
export class DashboardHeader {

}
