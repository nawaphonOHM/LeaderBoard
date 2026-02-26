import {Component, effect} from '@angular/core';
import {filter} from 'rxjs';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';
import {MatDialog} from '@angular/material/dialog';
import {NewRunnerRegister} from '../new-runner-register/new-runner-register';
import {DashBoardAddNewRunnerData} from '../interfaces/dash-board-add-new-runner-data';

@Component({
  selector: 'app-dashboard-add-new-runner-coordinator',
  imports: [],
  templateUrl: './dashboard-add-new-runner-coordinator.html',
  styleUrl: './dashboard-add-new-runner-coordinator.scss'
})
export class DashboardAddNewRunnerCoordinator{

  constructor(
    readonly dashBoardAddNewRunnerCoordinatorRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower,
    readonly matDialog: MatDialog
  ) {

    effect(() => {
      const signal = dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable()

      if (signal()?.state !== 'RESPONSE_DATA') {
        return
      }

      this.openNewRunnerDialog()
    });
  }

  openNewRunnerDialog() {
    this.matDialog.open(NewRunnerRegister, { disableClose: true }).afterClosed().pipe(filter(it => it !== undefined && it !== null)).subscribe((result: DashBoardAddNewRunnerData) => {
      console.log(`Dialog is closed: ${JSON.stringify(result)}`)
      this.dashBoardAddNewRunnerCoordinatorRadioTower.emitMessage({
        state: 'SEND_REQUEST',
        data: result
      })
    })
  }

}
