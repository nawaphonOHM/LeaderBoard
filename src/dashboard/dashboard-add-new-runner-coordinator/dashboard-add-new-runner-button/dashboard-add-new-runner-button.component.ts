import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  DashBoardAddNewRunnerCoordinatorRadioTowerService
} from '../../../services/dash-board-add-new-runner-coordinator-radio-tower.service';

@Component({
  selector: 'app-dashboard-add-new-runner-button',
  imports: [
    MatButton
  ],
  templateUrl: './dashboard-add-new-runner-button.component.html',
  styleUrl: './dashboard-add-new-runner-button.component.scss'
})
export class DashboardAddNewRunnerButtonComponent {

  private readonly dashBoardAddNewRunnerButtonRadioTower = inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);

  askForNewRunner() {
    this.dashBoardAddNewRunnerButtonRadioTower.emitMessage({
      state: 'RESPONSE_DATA',
      data: null
    })
  }

}
