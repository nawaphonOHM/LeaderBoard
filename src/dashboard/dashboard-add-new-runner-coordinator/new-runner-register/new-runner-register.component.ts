import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {GeneralInputComponent} from './general-input/general-input.component';
import {Country, CountrySelectComponent} from '@wlucha/ng-country-select';
import {TimeUsedForFinnishRunningComponent} from './time-used-for-finnish-running/time-used-for-finnish-running.component';
import {CONFIGURATION, ConfigurationMain} from '../../../variables/configurations';
import {UnexpectedToReachHere} from '../../../errors/unexpected-to-reach-here';
import {TimeUsedForFinnishRunningEvent} from '../../../interfaces/time-used-for-finnish-running-event';

@Component({
  selector: 'app-new-runner-register',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    GeneralInputComponent,
    CountrySelectComponent,
    TimeUsedForFinnishRunningComponent,

  ],
  templateUrl: './new-runner-register.component.html',
  styleUrl: './new-runner-register.component.scss',
  providers: [{ provide: CONFIGURATION, useValue: ConfigurationMain }]
})
export class NewRunnerRegisterComponent {

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
    timeUsedInMillisecond: new FormControl(-1, {
      nonNullable: true,
      validators: [Validators.min(0)]
    })
  })

  private readonly matDialog = inject(MatDialogRef<NewRunnerRegisterComponent>);

  private readonly configuration = inject(CONFIGURATION)

  cancelCallback() {
    this.matDialog.close()
  }

  save() {

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
  }

  onTimeChange(newValue: TimeUsedForFinnishRunningEvent) {
    if (!newValue.valid) {
      this.inputGroup.controls.timeUsedInMillisecond.setValue(-1)
    } else {
      this.inputGroup.controls.timeUsedInMillisecond.setValue(newValue.time)
    }
  }

}
