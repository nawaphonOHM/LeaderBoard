import {Component, effect, inject} from '@angular/core';
import {filter} from 'rxjs';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';
import {MatDialog} from '@angular/material/dialog';
import {DashBoardAddNewRunnerData} from '../interfaces/dash-board-add-new-runner-data';

@Component({
  selector: 'app-dashboard-add-new-runner-coordinator',
  imports: [],
  templateUrl: './dashboard-add-new-runner-coordinator.html',
  styleUrl: './dashboard-add-new-runner-coordinator.scss'
})
export class DashboardAddNewRunnerCoordinator{

  private readonly dashBoardAddNewRunnerCoordinatorRadioTower = inject(DashBoardAddNewRunnerCoordinatorRadioTower);
  private readonly matDialog = inject(MatDialog);

  constructor() {

    effect(() => {
      const signal = this.dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable()

      if (signal()?.state !== 'RESPONSE_DATA') {
        return
      }

      this.openNewRunnerDialog().then(() => console.log('NewRunnerRegister works'))
    });
  }

  async openNewRunnerDialog() {
    const {NewRunnerRegister} = await import('../new-runner-register/new-runner-register');

    this.matDialog.open(NewRunnerRegister, { disableClose: true }).afterClosed().pipe(filter(it => it !== undefined && it !== null)).subscribe((result: DashBoardAddNewRunnerData) => {
      console.log(`Dialog is closed: ${JSON.stringify(result)}`)
      this.dashBoardAddNewRunnerCoordinatorRadioTower.emitMessage({
        state: 'SEND_REQUEST',
        data: result
      })
    })
  }

}
