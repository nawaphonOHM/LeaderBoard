import { Component, input, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRunnerRegisterComponent } from './new-runner-register.component';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CONFIGURATION } from '../../../variables/configurations';
import { UnexpectedToReachHere } from '../../../errors/unexpected-to-reach-here';
import { Country } from '@wlucha/ng-country-select';
import { TIME_UNIT } from '../../../variables/time-unit';
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-general-input',
  standalone: true,
  template: ''
})
class MockGeneralInput {
  input = input.required<FormControl>();
  errorMessage = input<string | null>(null);
  label = input.required<string>();
}

@Component({
  selector: 'app-time-used-for-finnish-running',
  standalone: true,
  template: ''
})
class MockTimeUsedForFinnishRunning {
  input = input.required<FormControl>();
}

@Component({
  selector: 'ng-country-select',
  standalone: true,
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockCountrySelect),
      multi: true
    }
  ]
})
class MockCountrySelect implements ControlValueAccessor {
  requiredErrorMessage = input<string | null>(null);
  showRequiredErrorMessage = input<boolean>(false);
  required = input<boolean>(false);
  formControl = input<FormControl | null>(null);
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

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        NewRunnerRegisterComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        {
          provide: CONFIGURATION,
          useValue: { flagUrl: 'https://flagsapi.com/__nationality__/flat/32.png' }
        },
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 }
        }
      ]
    }).overrideComponent(NewRunnerRegisterComponent, {
      set: {
        imports: [
          ReactiveFormsModule,
          MatDialogTitle,
          MatDialogContent,
          MatDialogActions,
          MatButton,
          MatDialogClose,
          MockGeneralInput,
          MockTimeUsedForFinnishRunning,
          MockCountrySelect
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(NewRunnerRegisterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize inputGroup with default values', () => {
      const inputGroup = (component as unknown as { inputGroup: NewRunnerRegisterComponent['inputGroup'] }).inputGroup;
      expect(inputGroup.getRawValue()).toEqual({
        firstName: '',
        lastName: '',
        nationality: null,
        timeUsedInMillisecond: -1
      });
    });

    it('should have required validators on all fields except timeUsedInMillisecond', () => {
      const inputGroup = (component as unknown as { inputGroup: NewRunnerRegisterComponent['inputGroup'] }).inputGroup;

      inputGroup.controls.firstName.setValue('');
      expect(inputGroup.controls.firstName.valid).toBeFalse();

      inputGroup.controls.lastName.setValue('');
      expect(inputGroup.controls.lastName.valid).toBeFalse();

      inputGroup.controls.nationality.setValue(null);
      expect(inputGroup.controls.nationality.valid).toBeFalse();
    });

    it('should have min(0) validator on timeUsedInMillisecond', () => {
      const inputGroup = (component as unknown as { inputGroup: NewRunnerRegisterComponent['inputGroup'] }).inputGroup;
      inputGroup.controls.timeUsedInMillisecond.setValue(-2);
      expect(inputGroup.controls.timeUsedInMillisecond.valid).toBeFalse();
    });
  });

  describe('cancelCallback', () => {
    it('should close the dialog without data', () => {
      component.cancelCallback();
      expect(matDialogRefMock.close).toHaveBeenCalledWith();
    });
  });

  describe('save', () => {
    it('should close the dialog with runner data when nationality is valid', () => {
      const inputGroup = (component as unknown as { inputGroup: NewRunnerRegisterComponent['inputGroup'] }).inputGroup;
      inputGroup.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        nationality: { alpha2: 'US' } as Country,
        timeUsedInMillisecond: 12345
      });

      component.save();

      expect(matDialogRefMock.close).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        nationalityUrlImage: 'https://flagsapi.com/US/flat/32.png',
        timeUsedInMillisecond: 12345
      });
    });

    it('should throw UnexpectedToReachHere when nationality is missing alpha2', () => {
      const inputGroup = (component as unknown as { inputGroup: NewRunnerRegisterComponent['inputGroup'] }).inputGroup;
      inputGroup.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        nationality: {} as unknown as Country,
        timeUsedInMillisecond: 12345
      });

      expect(() => {
        component.save();
      }).toThrowError(UnexpectedToReachHere, "nationality should has a value.");
    });
  });
});
