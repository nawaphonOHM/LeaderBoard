import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';

@Component({
  selector: 'app-dashboard-add-new-runner-coordinator',
  imports: [],
  templateUrl: './dashboard-add-new-runner-coordinator.html',
  styleUrl: './dashboard-add-new-runner-coordinator.scss'
})
export class DashboardAddNewRunnerCoordinator implements OnDestroy{

  private readonly requestNewDialogListener: Subscription

  constructor(readonly dashBoardAddNewRunnerCoordinatorRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower) {
    this.requestNewDialogListener = dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable().subscribe()
  }

  ngOnDestroy(): void {
        this.requestNewDialogListener.unsubscribe()
    }

}
