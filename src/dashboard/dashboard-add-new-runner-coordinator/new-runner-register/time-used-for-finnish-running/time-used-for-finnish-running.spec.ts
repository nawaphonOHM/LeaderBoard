import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeUsedForFinnishRunning } from './time-used-for-finnish-running';
import { AddNewRunnerModalRadioTower, FORM_STATE } from '../../../../services/add-new-runner-modal-radio-tower';
import { TIME_UNIT } from '../../../../variables/timeUnit';
import { FormControl } from '@angular/forms';

describe('TimeUsedForFinnishRunning', () => {
  let component: TimeUsedForFinnishRunning;
  let fixture: ComponentFixture<TimeUsedForFinnishRunning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeUsedForFinnishRunning],
      providers: [
        AddNewRunnerModalRadioTower,
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeUsedForFinnishRunning);
    component = fixture.componentInstance;
    component.input = new FormControl(0) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update input control when radioTower emits SAVING', () => {
    const radioTower = TestBed.inject(AddNewRunnerModalRadioTower);
    const inputGroup = (component as any).inputGroup;

    inputGroup.patchValue({
      minutes: 1,
      seconds: 30,
      milliseconds: 500
    });

    radioTower.emitMessage(FORM_STATE.SAVING);
    fixture.detectChanges();

    // 1 min * 60 sec * 1000 ms + 30 sec * 1000 ms + 500 ms = 60000 + 30000 + 500 = 90500
    expect(component.input.value).toBe(90500);
  });

  it('should emit DONE after calculation', () => {
    const radioTower = TestBed.inject(AddNewRunnerModalRadioTower);
    spyOn(radioTower, 'emitMessage').and.callThrough();

    radioTower.emitMessage(FORM_STATE.SAVING);
    fixture.detectChanges();

    expect(radioTower.emitMessage).toHaveBeenCalledWith(FORM_STATE.DONE);
  });
});
