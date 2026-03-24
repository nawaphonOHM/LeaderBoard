import { TestBed } from '@angular/core/testing';

import { DashBoardAddNewRunnerInformationEnvelop } from '../interfaces/dash-board-add-new-runner-information-envelop';
import { DashBoardAddNewRunnerCoordinatorRadioTowerService } from './dash-board-add-new-runner-coordinator-radio-tower.service';

describe('DashBoardAddNewRunnerCoordinatorRadioTowerService', () => {
  let service: DashBoardAddNewRunnerCoordinatorRadioTowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null', () => {
    const signalValue = service.requestNewObservable();
    expect(signalValue()).toBeNull();
  });

  it('should emit messages', () => {
    const message: DashBoardAddNewRunnerInformationEnvelop<number> = { state: 'SEND_REQUEST', data: 123 };
    const signalValue = service.requestNewObservable();
    service.emitMessage(message);
    expect(signalValue()).toBe(message);
  });
});
