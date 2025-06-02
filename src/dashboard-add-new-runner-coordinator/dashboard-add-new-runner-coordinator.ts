import {Component, OnDestroy} from '@angular/core';
import {filter, Subscription} from 'rxjs';
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
export class DashboardAddNewRunnerCoordinator implements OnDestroy{

  private readonly requestNewDialogListener: Subscription

  constructor(
    readonly dashBoardAddNewRunnerCoordinatorRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower,
    readonly matDialog: MatDialog
  ) {
    this.requestNewDialogListener = dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable()
      .pipe(filter(message => message.state === 'RESPONSE_DATA'))
      .subscribe(this.openNewRunnerDialog.bind(this))
  }

  openNewRunnerDialog() {
    this.matDialog.open(NewRunnerRegister).afterClosed().subscribe((result: DashBoardAddNewRunnerData) => {
      console.log(`Dialog is closed: ${result}`)
      this.dashBoardAddNewRunnerCoordinatorRadioTower.emitMessage({
        state: 'SEND_REQUEST',
        data: result
      })
    })
  }

  ngOnDestroy(): void {
        this.requestNewDialogListener.unsubscribe()
    }

}
