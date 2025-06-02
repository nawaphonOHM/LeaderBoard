import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {DashBoardAddNewRunnerData} from '../interfaces/dash-board-add-new-runner-data';
import {GeneralInput} from '../general-input/general-input';
import {Country, CountrySelectComponent} from '@wlucha/ng-country-select';
import {TimeUsedForFinnishRunning} from '../time-used-for-finnish-running/time-used-for-finnish-running';

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

  constructor(readonly matDialog: MatDialogRef<NewRunnerRegister>) {
  }

  cancelCallback() {
    this.matDialog.close()
  }

  save(): DashBoardAddNewRunnerData {
    const rawInput = this.inputGroup.getRawValue()

    if (this.inputGroup.invalid) {
      return {
        firstName: '',
        lastName: '',
        nationalityUrlImage: '',
        timeUsedInMillisecond: -1
      }
    }


    return {
      firstName: rawInput.firstName || '',
      lastName: rawInput.lastName || '',
      nationalityUrlImage: rawInput.nationality?.alpha2 || '',
      timeUsedInMillisecond: rawInput.timeUsedInMillisecond || -1

    }
  }

}
