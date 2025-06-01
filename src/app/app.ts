import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [MatCard, MatCardTitle, MatCardHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
