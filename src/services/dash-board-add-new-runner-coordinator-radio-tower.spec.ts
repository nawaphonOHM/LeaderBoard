import { TestBed } from '@angular/core/testing';

import { DashBoardAddNewRunnerCoordinatorRadioTower } from './dash-board-add-new-runner-coordinator-radio-tower';

describe('DashBoardAddNewRunnerCoordinatorRadioTower', () => {
  let service: DashBoardAddNewRunnerCoordinatorRadioTower;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTower);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null', () => {
    const signalValue = service.requestNewObservable();
    expect(signalValue()).toBeNull();
  });

  it('should emit messages', () => {
    const message = { type: 'TEST', data: 123 } as any;
    const signalValue = service.requestNewObservable();
    service.emitMessage(message);
    expect(signalValue()).toBe(message);
  });
});
