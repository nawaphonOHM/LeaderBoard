import { Component, input, forwardRef, output, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRunnerRegisterComponent } from './new-runner-register.component';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CONFIGURATION } from './configurations';
import { Country } from '@wlucha/ng-country-select';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { TimeUsedForFinnishRunningEvent } from './time-used-for-finnish-running-event';

@Component({
  selector: 'app-general-input',
  standalone: true,
  template: '',
})
class MockGeneralInput {
  input = input.required<FieldTree<string>>();
  errorMessage = input<string | null>(null);
  label = input.required<string>();
}

@Component({
  selector: 'app-time-used-for-finnish-running',
  standalone: true,
  template: '',
})
class MockTimeUsedForFinnishRunning {
  somethingChange = output<TimeUsedForFinnishRunningEvent>();
}

@Component({
  selector: 'ng-country-select',
  standalone: true,
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockCountrySelect),
      multi: true,
    },
  ],
})
class MockCountrySelect implements ControlValueAccessor {
  requiredErrorMessage = input<string | null>(null);
  showRequiredErrorMessage = input<boolean>(false);
  required = input<boolean>(false);
  placeholder = input<string | null>(null);

  writeValue(obj: unknown): void {}
  registerOnChange(fn: (value: unknown) => void): void {}
  registerOnTouched(fn: () => void): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

describe('NewRunnerRegisterComponent', () => {
  let component: NewRunnerRegisterComponent;
  let fixture: ComponentFixture<NewRunnerRegisterComponent>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<NewRunnerRegisterComponent>>;
  let runnerModel: WritableSignal<{
    firstName: string;
    lastName: string;
    nationality: Country;
    timeUsedInMillisecond: number;
  }>;
  let runnerForm: FieldTree<{
    firstName: string;
    lastName: string;
    nationality: Country;
    timeUsedInMillisecond: number;
  }>;

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [NewRunnerRegisterComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        {
          provide: CONFIGURATION,
          useValue: { flagUrl: 'https://flagsapi.com/__nationality__/flat/32.png' },
        },
      ],
    })
      .overrideComponent(NewRunnerRegisterComponent, {
        set: {
          imports: [
            FormField,
            MatDialogTitle,
            MatDialogContent,
            MatDialogActions,
            MatButton,
            MockGeneralInput,
            MockTimeUsedForFinnishRunning,
            MockCountrySelect,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NewRunnerRegisterComponent);
    component = fixture.componentInstance;
    runnerModel = (
      component as unknown as {
        runnerModel: WritableSignal<{
          firstName: string;
          lastName: string;
          nationality: Country;
          timeUsedInMillisecond: number;
        }>;
      }
    ).runnerModel;
    runnerForm = (
      component as unknown as {
        runnerForm: FieldTree<{
          firstName: string;
          lastName: string;
          nationality: Country;
          timeUsedInMillisecond: number;
        }>;
      }
    ).runnerForm;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize runnerModel with default values', () => {
      expect(runnerModel()).toEqual({
        firstName: '',
        lastName: '',
        nationality: {
          alpha2: '',
          alpha3: '',
          translations: {
            de: '',
            en: '',
            fr: '',
            it: '',
            es: '',
            ar: '',
            zh: '',
            hi: '',
            bn: '',
            pt: '',
            ru: '',
          },
        },
        timeUsedInMillisecond: -1,
      });
      expect(runnerForm().invalid()).toBeTrue();
    });

    it('should reject empty and whitespace-only names', () => {
      runnerModel.update((m) => ({ ...m, firstName: '' }));
      expect(runnerForm.firstName().invalid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, firstName: '   ' }));
      expect(runnerForm.firstName().invalid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, firstName: 'John' }));
      expect(runnerForm.firstName().valid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, lastName: '' }));
      expect(runnerForm.lastName().invalid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, lastName: '   ' }));
      expect(runnerForm.lastName().invalid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, lastName: 'Doe' }));
      expect(runnerForm.lastName().valid()).toBeTrue();
    });

    it('should reject missing nationality alpha2', () => {
      runnerModel.update((m) => ({
        ...m,
        nationality: { ...m.nationality, alpha2: '' },
      }));
      expect(runnerForm.nationality().invalid()).toBeTrue();

      runnerModel.update((m) => ({
        ...m,
        nationality: { ...m.nationality, alpha2: 'US' },
      }));
      expect(runnerForm.nationality().valid()).toBeTrue();
    });

    it('should have min(0) validator on timeUsedInMillisecond', () => {
      runnerModel.update((m) => ({ ...m, timeUsedInMillisecond: -2 }));
      expect(runnerForm.timeUsedInMillisecond().invalid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, timeUsedInMillisecond: 0 }));
      expect(runnerForm.timeUsedInMillisecond().valid()).toBeTrue();

      runnerModel.update((m) => ({ ...m, timeUsedInMillisecond: 5000 }));
      expect(runnerForm.timeUsedInMillisecond().valid()).toBeTrue();
    });
  });

  describe('cancelCallback', () => {
    it('should close the dialog without data', () => {
      component.cancelCallback();
      expect(matDialogRefMock.close).toHaveBeenCalledWith();
    });
  });

  describe('save', () => {
    it('should close the dialog with runner data when form is valid', async () => {
      runnerModel.set({
        firstName: 'John',
        lastName: 'Doe',
        nationality: {
          alpha2: 'US',
          alpha3: 'USA',
          translations: {
            de: 'Vereinigte Staaten',
            en: 'United States',
            fr: 'États-Unis',
            it: 'Stati Uniti',
            es: 'Estados Unidos',
            ar: '',
            zh: '',
            hi: '',
            bn: '',
            pt: '',
            ru: '',
          },
        },
        timeUsedInMillisecond: 12345,
      });

      component.save();
      await fixture.whenStable();

      expect(matDialogRefMock.close).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        nationalityUrlImage: 'https://flagsapi.com/US/flat/32.png',
        timeUsedInMillisecond: 12345,
      });
      expect(matDialogRefMock.close).toHaveBeenCalledTimes(1);
    });

    it('should trim whitespace from first and last names when saving', async () => {
      runnerModel.set({
        firstName: '  Jane  ',
        lastName: '  Smith  ',
        nationality: {
          alpha2: 'ca',
          alpha3: 'CAN',
          translations: {
            de: 'Kanada',
            en: 'Canada',
            fr: 'Canada',
            it: 'Canada',
            es: 'Canadá',
            ar: '',
            zh: '',
            hi: '',
            bn: '',
            pt: '',
            ru: '',
          },
        },
        timeUsedInMillisecond: 60000,
      });

      component.save();
      await fixture.whenStable();

      expect(matDialogRefMock.close).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        nationalityUrlImage: 'https://flagsapi.com/CA/flat/32.png',
        timeUsedInMillisecond: 60000,
      });
    });

    it('should not close when nationality is missing alpha2', async () => {
      runnerModel.set({
        firstName: 'John',
        lastName: 'Doe',
        nationality: {
          alpha2: '',
          alpha3: '',
          translations: {
            de: '',
            en: '',
            fr: '',
            it: '',
            es: '',
            ar: '',
            zh: '',
            hi: '',
            bn: '',
            pt: '',
            ru: '',
          },
        },
        timeUsedInMillisecond: 12345,
      });

      component.save();
      await fixture.whenStable();

      expect(matDialogRefMock.close).not.toHaveBeenCalled();
    });

    it('should not close when the form is invalid', async () => {
      component.save();
      await fixture.whenStable();

      expect(matDialogRefMock.close).not.toHaveBeenCalled();
    });
  });

  describe('onTimeChange', () => {
    it('should update timeUsedInMillisecond when valid', () => {
      component.onTimeChange({ valid: true, time: 45000 });
      expect(runnerModel().timeUsedInMillisecond).toBe(45000);
    });

    it('should set timeUsedInMillisecond to -1 when invalid', () => {
      component.onTimeChange({ valid: true, time: 45000 });
      expect(runnerModel().timeUsedInMillisecond).toBe(45000);

      component.onTimeChange({ valid: false, time: -1 });
      expect(runnerModel().timeUsedInMillisecond).toBe(-1);
    });
  });

  describe('Save button state', () => {
    it('should disable the save button when form is invalid and enable when valid', () => {
      const saveButton = fixture.nativeElement.querySelector('button:last-child') as HTMLButtonElement;
      expect(saveButton.disabled).toBeTrue();

      runnerModel.set({
        firstName: 'John',
        lastName: 'Doe',
        nationality: {
          alpha2: 'US',
          alpha3: 'USA',
          translations: {
            de: '',
            en: '',
            fr: '',
            it: '',
            es: '',
            ar: '',
            zh: '',
            hi: '',
            bn: '',
            pt: '',
            ru: '',
          },
        },
        timeUsedInMillisecond: 10000,
      });
      fixture.detectChanges();

      expect(saveButton.disabled).toBeFalse();
    });
  });
});
