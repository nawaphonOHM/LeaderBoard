import {Component, effect, inject, input} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TIME_UNIT} from '../../../../variables/timeUnit';
import {AddNewRunnerModalRadioTower, FORM_STATE} from '../../../../services/add-new-runner-modal-radio-tower';

@Component({
  selector: 'app-time-used-for-finnish-running',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatError
  ],
  templateUrl: './time-used-for-finnish-running.html',
  styleUrl: './time-used-for-finnish-running.scss'
})
export class TimeUsedForFinnishRunning {

  inputSignal = input.required<FormControl<number>>({ alias: 'input' });

  protected readonly inputGroup = new FormGroup({
    minutes: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0)
      ]
    }),
    seconds: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0),
        Validators.max(59)
      ]
    }),
    milliseconds: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0),
        Validators.max(999)
      ]
    }),
  })

  private readonly TIME_UNIT = inject(TIME_UNIT)

  private readonly radioTower = inject(AddNewRunnerModalRadioTower)

  constructor() {

    effect(() => {
      const signal = this.radioTower.requestNewObservable()

      if (signal() !== FORM_STATE.SAVING) {
        return
      }

      const value = this.inputGroup.getRawValue();

      this.inputSignal().setValue((value.minutes * this.TIME_UNIT.SECOND_IN_MINUTE * this.TIME_UNIT.MILLISECONDS_IN_SECOND) + (value.seconds * this.TIME_UNIT.MILLISECONDS_IN_SECOND) + value.milliseconds)

      this.radioTower.emitMessage(FORM_STATE.DONE)
    });

  }

}
