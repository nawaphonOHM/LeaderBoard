import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeUsedForFinnishRunningComponent } from './time-used-for-finnish-running.component';
import { TIME_UNIT } from '../../time-unit';
import { WritableSignal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TimeUsedForFinnishRunningComponent', () => {
  let component: TimeUsedForFinnishRunningComponent;
  let fixture: ComponentFixture<TimeUsedForFinnishRunningComponent>;
  let timeModel: WritableSignal<{ minutes: string; seconds: string; milliseconds: string }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeUsedForFinnishRunningComponent, NoopAnimationsModule],
      providers: [
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeUsedForFinnishRunningComponent);
    component = fixture.componentInstance;
    timeModel = (
      component as unknown as {
        timeModel: WritableSignal<{ minutes: string; seconds: string; milliseconds: string }>;
      }
    ).timeModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit somethingChange with valid: false initially', () => {
    const newFixture = TestBed.createComponent(TimeUsedForFinnishRunningComponent);
    const newComponent = newFixture.componentInstance;
    const emitSpy = spyOn(newComponent.somethingChange, 'emit');
    newFixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith({
      valid: false,
      time: -1,
    });
  });

  it('should emit somethingChange when input values change and are valid', () => {
    const spy = spyOn(component.somethingChange, 'emit');

    timeModel.set({
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

    timeModel.set({
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

  it('should accept zero values as valid minimum', () => {
    const spy = spyOn(component.somethingChange, 'emit');

    timeModel.set({
      minutes: '0',
      seconds: '0',
      milliseconds: '0',
    });

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      valid: true,
      time: 0,
    });
  });

  it('should accept the maximum seconds and milliseconds values', () => {
    const spy = spyOn(component.somethingChange, 'emit');

    timeModel.set({
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

    timeModel.set({
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

  it('should display required validation errors when fields are touched and empty', () => {
    const timeForm = (component as unknown as { timeForm: any }).timeForm;

    timeForm.minutes().markAsTouched();
    timeForm.seconds().markAsTouched();
    timeForm.milliseconds().markAsTouched();
    fixture.detectChanges();

    const errors = (fixture.nativeElement as HTMLElement).querySelectorAll('mat-error');
    expect(errors.length).toBe(3);
    errors.forEach((err) => {
      expect(err.textContent).toContain('This field is required.');
    });
  });

  it('should display pattern validation error when minutes has invalid characters', () => {
    const timeForm = (component as unknown as { timeForm: any }).timeForm;

    timeModel.set({
      minutes: 'abc',
      seconds: '0',
      milliseconds: '0',
    });
    timeForm.minutes().markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Enter a whole number.');
  });

  it('should display seconds range error when seconds exceed 59', () => {
    const timeForm = (component as unknown as { timeForm: any }).timeForm;

    timeModel.set({
      minutes: '1',
      seconds: '60',
      milliseconds: '0',
    });
    timeForm.seconds().markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain(
      'You entered invalid seconds. Seconds must be between 0 and 59.',
    );
  });

  it('should display milliseconds range error when milliseconds exceed 999', () => {
    const timeForm = (component as unknown as { timeForm: any }).timeForm;

    timeModel.set({
      minutes: '1',
      seconds: '0',
      milliseconds: '1000',
    });
    timeForm.milliseconds().markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain(
      'You entered invalid milliseconds. Milliseconds must be between 0 and 999.',
    );
  });

  it('should emit updated times on subsequent valid changes', () => {
    const spy = spyOn(component.somethingChange, 'emit');

    timeModel.set({
      minutes: '2',
      seconds: '15',
      milliseconds: '250',
    });
    fixture.detectChanges();

    // 2 * 60 * 1000 + 15 * 1000 + 250 = 120000 + 15000 + 250 = 135250
    expect(spy).toHaveBeenCalledWith({
      valid: true,
      time: 135250,
    });

    timeModel.set({
      minutes: '0',
      seconds: '45',
      milliseconds: '100',
    });
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      valid: true,
      time: 45100,
    });
  });
});
