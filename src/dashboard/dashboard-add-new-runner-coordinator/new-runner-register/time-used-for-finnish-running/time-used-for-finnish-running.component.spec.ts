import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeUsedForFinnishRunningComponent } from './time-used-for-finnish-running.component';
import { TIME_UNIT } from '../../time-unit';

describe('TimeUsedForFinnishRunningComponent', () => {
  let component: TimeUsedForFinnishRunningComponent;
  let fixture: ComponentFixture<TimeUsedForFinnishRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeUsedForFinnishRunningComponent],
      providers: [
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeUsedForFinnishRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit somethingChange when input values change and are valid', () => {
    const spy = spyOn(component.somethingChange, 'emit');
    const inputGroup = (
      component as unknown as { inputGroup: TimeUsedForFinnishRunningComponent['inputGroup'] }
    ).inputGroup;

    inputGroup.patchValue({
      minutes: '1',
      seconds: '30',
      milliseconds: '500',
    });

    fixture.detectChanges();

    // 1 min * 60 sec * 1000 ms + 30 sec * 1000 ms + 500 ms = 60000 + 30000 + 500 = 90500
    expect(spy).toHaveBeenCalledWith({
      valid: true,
      time: 90500,
    });
  });

  it('should emit somethingChange with valid: false when input values are invalid', () => {
    const spy = spyOn(component.somethingChange, 'emit');
    const inputGroup = (
      component as unknown as { inputGroup: TimeUsedForFinnishRunningComponent['inputGroup'] }
    ).inputGroup;

    inputGroup.patchValue({
      minutes: '-1',
      seconds: '30',
      milliseconds: '500',
    });

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      valid: false,
      time: -1,
    });
  });

  it('should accept the maximum seconds and milliseconds values', () => {
    const spy = spyOn(component.somethingChange, 'emit');
    const inputGroup = (
      component as unknown as { inputGroup: TimeUsedForFinnishRunningComponent['inputGroup'] }
    ).inputGroup;

    inputGroup.patchValue({
      minutes: '1',
      seconds: '59',
      milliseconds: '999',
    });

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      valid: true,
      time: 119999,
    });
  });

  it('should reject seconds and milliseconds above their limits', () => {
    const spy = spyOn(component.somethingChange, 'emit');
    const inputGroup = (
      component as unknown as { inputGroup: TimeUsedForFinnishRunningComponent['inputGroup'] }
    ).inputGroup;

    inputGroup.patchValue({
      minutes: '1',
      seconds: '60',
      milliseconds: '1000',
    });

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      valid: false,
      time: -1,
    });
  });
});
