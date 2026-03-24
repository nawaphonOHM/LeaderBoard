import {Component, effect, inject} from '@angular/core';
import {filter} from 'rxjs';
import {
  DashBoardAddNewRunnerCoordinatorRadioTowerService
} from '../../services/dash-board-add-new-runner-coordinator-radio-tower.service';
import {MatDialog} from '@angular/material/dialog';
import {DashBoardAddNewRunnerData} from '../../interfaces/dash-board-add-new-runner-data';

@Component({
  selector: 'app-dashboard-add-new-runner-coordinator',
  imports: [],
  templateUrl: './dashboard-add-new-runner-coordinator.component.html',
  styleUrl: './dashboard-add-new-runner-coordinator.component.scss'
})
export class DashboardAddNewRunnerCoordinatorComponent {

  private readonly dashBoardAddNewRunnerCoordinatorRadioTower = inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);
  private readonly matDialog = inject(MatDialog);

  constructor() {

    effect(() => {
      const signal = this.dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable()

      if (signal()?.state !== 'RESPONSE_DATA') {
        return
      }

      this.openNewRunnerDialog().then(() => console.log('NewRunnerRegisterComponent works'))
    });
  }

  async openNewRunnerDialog() {
    const {NewRunnerRegisterComponent} = await import('./new-runner-register/new-runner-register.component');

    this.matDialog.open(NewRunnerRegisterComponent, {disableClose: true}).afterClosed().pipe(filter(it => it !== undefined && it !== null)).subscribe((result: DashBoardAddNewRunnerData) => {
      console.log(`Dialog is closed: ${JSON.stringify(result)}`)
      this.dashBoardAddNewRunnerCoordinatorRadioTower.emitMessage({
        state: 'SEND_REQUEST',
        data: result
      })
    })
  }

}
