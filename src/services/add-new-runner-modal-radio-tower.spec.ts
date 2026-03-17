import { TestBed } from '@angular/core/testing';
import { AddNewRunnerModalRadioTower, FORM_STATE } from './add-new-runner-modal-radio-tower';

describe('AddNewRunnerModalRadioTower', () => {
  let service: AddNewRunnerModalRadioTower;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewRunnerModalRadioTower]
    });
    service = TestBed.inject(AddNewRunnerModalRadioTower);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with NOP state', () => {
    const signalValue = service.requestNewObservable();
    expect(signalValue()).toBe(FORM_STATE.NOP);
  });

  it('should emit messages', () => {
    const signalValue = service.requestNewObservable();
    service.emitMessage(FORM_STATE.SAVING);
    expect(signalValue()).toBe(FORM_STATE.SAVING);

    service.emitMessage(FORM_STATE.DONE);
    expect(signalValue()).toBe(FORM_STATE.DONE);
  });
});
