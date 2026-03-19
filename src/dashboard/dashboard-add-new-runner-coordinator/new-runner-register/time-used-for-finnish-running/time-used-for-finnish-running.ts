import {Component, effect, inject, input} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TIME_UNIT} from '../../../../variables/timeUnit';
import {AddNewRunnerModalRadioTower, FORM_STATE} from '../../../../services/add-new-runner-modal-radio-tower';
import {TimeUsedForFinnishRunningEvent} from '../../../../interfaces/time-used-for-finnish-running-event';

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

  somethingChange = output<TimeUsedForFinnishRunningEvent>()

  protected readonly inputGroup = new FormGroup({
    minutes: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0)
      ]
    }),
    seconds: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0),
        Validators.max(59)
      ]
    }),
    milliseconds: new FormControl<string>('', {
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

      const valueAsNumber = {
        minutes: parseInt(value.minutes),
        seconds: parseInt(value.seconds),
        milliseconds: parseInt(value.milliseconds)
      }

      this.inputSignal().setValue((valueAsNumber.minutes * this.TIME_UNIT.SECOND_IN_MINUTE * this.TIME_UNIT.MILLISECONDS_IN_SECOND) + (valueAsNumber.seconds * this.TIME_UNIT.MILLISECONDS_IN_SECOND) + valueAsNumber.milliseconds)

      this.radioTower.emitMessage(FORM_STATE.DONE)
    });

  }

}
