import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DashBoardAddNewRunnerInformationEnvelop} from '../interfaces/dash-board-add-new-runner-information-envelop';

@Injectable({
  providedIn: 'root'
})
export class DashBoardAddNewRunnerCoordinatorRadioTower {

  private readonly radio = new Subject<DashBoardAddNewRunnerInformationEnvelop<unknown>>()

  requestNewObservable(): Observable<DashBoardAddNewRunnerInformationEnvelop<unknown>> {
    return this.radio.asObservable()
  }

  emitMessage(message: DashBoardAddNewRunnerInformationEnvelop<unknown>) {
    this.radio.next(message)
  }
}
