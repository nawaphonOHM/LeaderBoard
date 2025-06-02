import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {DashBoardAddNewRunnerData} from '../interfaces/dash-board-add-new-runner-data';
import {GeneralInput} from '../general-input/general-input';
import {CountrySelectComponent} from '@wlucha/ng-country-select';

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
  ],
  templateUrl: './new-runner-register.html',
  styleUrl: './new-runner-register.scss'
})
export class NewRunnerRegister {

  protected readonly inputGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    nationality: new FormControl('', [ Validators.required ]),
    timeUsedInMillisecond: new FormControl('', [ Validators.required ])
  })

  constructor(readonly matDialog: MatDialogRef<NewRunnerRegister>) {
  }

  cancelCallback() {
    this.matDialog.close()
  }

  save(): DashBoardAddNewRunnerData {
    const rawInput = this.inputGroup.getRawValue()

    if (rawInput.firstName === null) {
      throw new Error('First name should not be null')
    }

    if (rawInput.lastName === null) {
      throw new Error('Last name should not be null')
    }

    if (rawInput.nationality === null) {
      throw new Error('Nationality should not be null')
    }

    if (rawInput.timeUsedInMillisecond === null) {
      throw new Error('Time used in millisecond should not be null')
    }


    return {
      firstName: rawInput.firstName,
      lastName: rawInput.lastName,
      nationalityUrlImage: rawInput.nationality,
      timeUsedInMillisecond: Number.parseInt(rawInput.timeUsedInMillisecond)

    }
  }

}
