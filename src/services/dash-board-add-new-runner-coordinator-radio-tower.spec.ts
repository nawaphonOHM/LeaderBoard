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
});
