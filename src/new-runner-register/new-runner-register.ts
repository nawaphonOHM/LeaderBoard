import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {DashBoardAddNewRunnerData} from '../interfaces/dash-board-add-new-runner-data';
import {GeneralInput} from '../general-input/general-input';
import {Country, CountrySelectComponent} from '@wlucha/ng-country-select';
import {TimeUsedForFinnishRunning} from '../time-used-for-finnish-running/time-used-for-finnish-running';
import {CONFIGURATION} from '../configurations';
import {UnexpectedToReachHere} from '../errors/UnexpectedToReachHere';

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
  styleUrl: './new-runner-register.scss'
})
export class NewRunnerRegister {

  protected readonly inputGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    nationality: new FormControl<Country | null>(null, [ Validators.required ]),
    timeUsedInMillisecond: new FormControl(0, [ Validators.min(0) ])
  })

  private readonly matDialog = inject(MatDialogRef<NewRunnerRegister>);

  private readonly configuration = inject(CONFIGURATION)

  constructor() {
  }

  cancelCallback() {
    this.matDialog.close()
  }

  save(): DashBoardAddNewRunnerData {
    const rawInput = this.inputGroup.getRawValue()

    if (this.inputGroup.invalid) {
      throw new UnexpectedToReachHere("inputGroup should be valid as input should be validated before calling this method.")
    }

    if (rawInput.nationality?.alpha2 === undefined) {
      console.log('invalid nationality')
      throw new UnexpectedToReachHere("nationality should has a value as it should be validated before calling this method.")
    }


    return {
      firstName: rawInput.firstName || '',
      lastName: rawInput.lastName || '',
      nationalityUrlImage: this.configuration.flagUrl.replaceAll("__nationality__", rawInput.nationality?.alpha2.toUpperCase()),
      timeUsedInMillisecond: rawInput.timeUsedInMillisecond || -1

    }
  }

}
