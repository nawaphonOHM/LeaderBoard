import { Component, Input, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRunnerRegister } from './new-runner-register';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CONFIGURATION } from '../../../variables/configurations';
import { AddNewRunnerModalRadioTower, FORM_STATE } from '../../../services/add-new-runner-modal-radio-tower';
import { UnexpectedToReachHere } from '../../../errors/UnexpectedToReachHere';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Country } from '@wlucha/ng-country-select';
import { TIME_UNIT } from '../../../variables/timeUnit';
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-general-input',
  standalone: true,
  template: ''
})
class MockGeneralInput {
  @Input({required: true}) input!: FormControl;
  @Input({required: false}) errorMessage: string | null = null;
  @Input({required: true}) label!: string;
}

@Component({
  selector: 'app-time-used-for-finnish-running',
  standalone: true,
  template: ''
})
class MockTimeUsedForFinnishRunning {
  @Input({required: true}) input!: FormControl;
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
  @Input() requiredErrorMessage: any;
  @Input() showRequiredErrorMessage: any;
  @Input() required: any;
  @Input() formControl: any;
  @Input() placeholder: any;

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

describe('NewRunnerRegister', () => {
  let component: NewRunnerRegister;
  let fixture: ComponentFixture<NewRunnerRegister>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<NewRunnerRegister>>;
  let radioTower: AddNewRunnerModalRadioTower;

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        NewRunnerRegister,
        NoopAnimationsModule
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
    }).overrideComponent(NewRunnerRegister, {
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

    fixture = TestBed.createComponent(NewRunnerRegister);
    component = fixture.componentInstance;
    radioTower = fixture.debugElement.injector.get(AddNewRunnerModalRadioTower);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize inputGroup with default values', () => {
      const inputGroup = (component as any).inputGroup;
      expect(inputGroup.getRawValue()).toEqual({
        firstName: '',
        lastName: '',
        nationality: null,
        timeUsedInMillisecond: 0
      });
    });

    it('should have required validators on all fields except timeUsedInMillisecond', () => {
      const inputGroup = (component as any).inputGroup;

      inputGroup.controls.firstName.setValue('');
      expect(inputGroup.controls.firstName.valid).toBeFalse();

      inputGroup.controls.lastName.setValue('');
      expect(inputGroup.controls.lastName.valid).toBeFalse();

      inputGroup.controls.nationality.setValue(null);
      expect(inputGroup.controls.nationality.valid).toBeFalse();
    });

    it('should have min(0) validator on timeUsedInMillisecond', () => {
      const inputGroup = (component as any).inputGroup;
      inputGroup.controls.timeUsedInMillisecond.setValue(-1);
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
    it('should emit SAVING message to radioTower', () => {
      spyOn(radioTower, 'emitMessage').and.callThrough();
      component.save();
      expect(radioTower.emitMessage).toHaveBeenCalledWith(FORM_STATE.SAVING);
    });
  });

  describe('effect logic', () => {
    it('should close the dialog with runner data when radioTower emits DONE and nationality is valid', () => {
      const inputGroup = (component as any).inputGroup;
      inputGroup.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        nationality: { alpha2: 'US' } as Country,
        timeUsedInMillisecond: 12345
      });

      radioTower.emitMessage(FORM_STATE.DONE);
      fixture.detectChanges();

      expect(matDialogRefMock.close).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        nationalityUrlImage: 'https://flagsapi.com/US/flat/32.png',
        timeUsedInMillisecond: 12345
      });
    });

    it('should throw UnexpectedToReachHere when DONE is emitted but nationality is missing alpha2', () => {
      const inputGroup = (component as any).inputGroup;
      inputGroup.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        nationality: {} as any,
        timeUsedInMillisecond: 12345
      });

      expect(() => {
        radioTower.emitMessage(FORM_STATE.DONE);
        fixture.detectChanges();
      }).toThrowError(UnexpectedToReachHere, "nationality should has a value.");
    });

    it('should not close the dialog if signal is not DONE', () => {
      radioTower.emitMessage(FORM_STATE.SAVING);
      fixture.detectChanges();
      expect(matDialogRefMock.close).not.toHaveBeenCalled();

      radioTower.emitMessage(FORM_STATE.INPUTTING);
      fixture.detectChanges();
      expect(matDialogRefMock.close).not.toHaveBeenCalled();

      radioTower.emitMessage(FORM_STATE.NOP);
      fixture.detectChanges();
      expect(matDialogRefMock.close).not.toHaveBeenCalled();
    });
  });
});
