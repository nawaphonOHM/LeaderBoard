import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoardAddNewRunnerCoordinatorRadioTower {

  public readonly radio = new Subject<unknown>()

  requestNewObservable(): Observable<unknown> {
    return this.radio.asObservable()
  }

  emitMessage(message: unknown) {
    this.radio.next(message)
  }
}
