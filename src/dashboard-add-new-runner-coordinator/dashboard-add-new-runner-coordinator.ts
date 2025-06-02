import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';
import {MatDialog} from '@angular/material/dialog';

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

  ngOnDestroy(): void {
        this.requestNewDialogListener.unsubscribe()
    }

}
