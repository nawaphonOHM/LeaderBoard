import { TestBed } from '@angular/core/testing';

import { AddNewRunnerModalRadioTower } from './add-new-runner-modal-radio-tower';

describe('AddNewRunnerModalRadioTower', () => {
  let service: AddNewRunnerModalRadioTower;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewRunnerModalRadioTower);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
