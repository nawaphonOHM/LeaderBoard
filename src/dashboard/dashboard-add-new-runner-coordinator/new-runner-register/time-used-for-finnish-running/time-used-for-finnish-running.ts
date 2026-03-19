import {Component, inject, OnDestroy, output} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {TIME_UNIT} from '../../../../variables/timeUnit';
import {TimeUsedForFinnishRunningEvent} from '../../../../interfaces/time-used-for-finnish-running-event';
import {combineLatest, filter, map, Subscription} from 'rxjs';
import {Time} from '../../../../interfaces/time';

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

  private readonly subscriptions: Subscription[] = []

  constructor() {

    const isValidStatus = this.inputGroup.statusChanges.pipe(map(it => it === 'VALID'))
    const valueChanges = this.inputGroup.valueChanges.pipe(
      filter(it => it.minutes !== undefined && it.seconds !== undefined && it.milliseconds !== undefined),
      map(it => ({
        minutes: it.minutes as string,
        seconds: it.seconds as string,
        milliseconds: it.milliseconds as string
      })),
      map((it): Time => {
        return {
          minutes: parseInt(it.minutes),
          seconds: parseInt(it.seconds),
          milliseconds: parseInt(it.milliseconds)
        }
      })
    )

    const expectedObserver = combineLatest([isValidStatus, valueChanges])

    const expectedSubscribes = expectedObserver.subscribe((it) => {
      if (it[0] === false) {
        this.somethingChange.emit({valid: false, time: -1})
        return
      }

      const time = (it[1].minutes * this.TIME_UNIT.SECOND_IN_MINUTE * this.TIME_UNIT.MILLISECONDS_IN_SECOND) +
        (it[1].seconds * this.TIME_UNIT.MILLISECONDS_IN_SECOND) +
        it[1].milliseconds

      this.somethingChange.emit({
        valid: true,
        time: time
      })
    })

    this.subscriptions.push(expectedSubscribes)

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(it => it.unsubscribe())
  }

}
