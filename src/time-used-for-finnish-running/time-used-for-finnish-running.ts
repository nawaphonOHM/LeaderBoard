import {Component, Input, OnDestroy} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MILLISECONDS_IN_SECOND, SECOND_IN_MINUTE} from '../variables/timeUnit';

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
export class TimeUsedForFinnishRunning implements OnDestroy {
  @Input({required: true}) input!: FormControl;

  protected readonly inputGroup = new FormGroup({
    minutes: new FormControl<string>('0', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(0)
    ]),
    seconds: new FormControl<string>('0', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(0),
      Validators.max(59)
    ]),
    milliseconds: new FormControl<string>('0', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(0),
      Validators.max(999)
    ]),
  })

  private readonly subscription = this.inputGroup.valueChanges.subscribe(value => {

    if (this.inputGroup.invalid) {
      this.input.setValue(-1)
      return
    }


    const seconds = parseInt(value.seconds || '0')
    const minutes = parseInt(value.minutes || '0')
    const milliseconds = parseInt(value.milliseconds || '0')

    this.input.setValue((minutes * SECOND_IN_MINUTE * MILLISECONDS_IN_SECOND) + (seconds * MILLISECONDS_IN_SECOND) + milliseconds)
  })

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
