import {Component, effect, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {GeneralInput} from './general-input/general-input';
import {Country, CountrySelectComponent} from '@wlucha/ng-country-select';
import {TimeUsedForFinnishRunning} from './time-used-for-finnish-running/time-used-for-finnish-running';
import {CONFIGURATION, ConfigurationMain} from '../../../variables/configurations';
import {UnexpectedToReachHere} from '../../../errors/UnexpectedToReachHere';
import {AddNewRunnerModalRadioTower, FORM_STATE} from '../../../services/add-new-runner-modal-radio-tower';

@Component({
  selector: 'app-new-runner-register',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    GeneralInput,
    CountrySelectComponent,
    TimeUsedForFinnishRunning,

  ],
  templateUrl: './new-runner-register.html',
  styleUrl: './new-runner-register.scss',
  providers: [AddNewRunnerModalRadioTower, { provide: CONFIGURATION, useValue: ConfigurationMain }]
})
export class NewRunnerRegister {

  protected readonly inputGroup = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    nationality: new FormControl<Country | null>(null, {
      nonNullable: false,
      validators: [Validators.required]
    }),
    timeUsedInMillisecond: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)]
    })
  })

  private readonly matDialog = inject(MatDialogRef<NewRunnerRegister>);

  private readonly configuration = inject(CONFIGURATION)

  private readonly radioTower = inject(AddNewRunnerModalRadioTower)

  constructor() {

    effect(() => {

      const signal = this.radioTower.requestNewObservable()

      if (signal() !== FORM_STATE.DONE) {
        return
      }

      const rawInput = this.inputGroup.getRawValue()

      if (rawInput.nationality?.alpha2 === undefined) {
        console.log('invalid nationality')
        throw new UnexpectedToReachHere("nationality should has a value.")
      }

      this.matDialog.close({
        firstName: rawInput.firstName,
        lastName: rawInput.lastName,
        nationalityUrlImage: this.configuration.flagUrl.replaceAll("__nationality__", rawInput.nationality?.alpha2.toUpperCase()),
        timeUsedInMillisecond: rawInput.timeUsedInMillisecond

      })
    })
  }

  cancelCallback() {
    this.matDialog.close()
  }

  save() {

    this.radioTower.emitMessage(FORM_STATE.SAVING)
  }

}
