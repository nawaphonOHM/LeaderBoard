import {Injectable, Signal, signal} from '@angular/core';
import {DashBoardAddNewRunnerInformationEnvelop} from '../interfaces/dash-board-add-new-runner-information-envelop';

@Injectable({
  providedIn: 'root'
})
export class DashBoardAddNewRunnerCoordinatorRadioTower {

  private readonly radio = signal<DashBoardAddNewRunnerInformationEnvelop<unknown> | null>(null)

  requestNewObservable(): Signal<DashBoardAddNewRunnerInformationEnvelop<unknown> | null> {
    return this.radio.asReadonly()
  }

  emitMessage(message: DashBoardAddNewRunnerInformationEnvelop<unknown>) {
    this.radio.set(message);
  }
}
