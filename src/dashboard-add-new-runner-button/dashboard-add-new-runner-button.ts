import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';

@Component({
  selector: 'app-dashboard-add-new-runner-button',
    imports: [
        MatButton
    ],
  templateUrl: './dashboard-add-new-runner-button.html',
  styleUrl: './dashboard-add-new-runner-button.scss'
})
export class DashboardAddNewRunnerButton {

  constructor(readonly dashBoardAddNewRunnerButtonRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower) {
  }

  askForNewRunner() {
    this.dashBoardAddNewRunnerButtonRadioTower.emitMessage({
      state: 'RESPONSE_DATA',
      data: null
    })
  }

}
