import { Component, effect, inject, output, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { form, FormField, pattern, required, validate } from '@angular/forms/signals';
import { TIME_UNIT } from '../../time-unit';
import { TimeUsedForFinnishRunningEvent } from '../time-used-for-finnish-running-event';
import { Time } from './time';

@Component({
  selector: 'app-time-used-for-finnish-running',
  imports: [MatFormField, MatInput, MatLabel, FormField, MatError],
  templateUrl: './time-used-for-finnish-running.component.html',
  styleUrl: './time-used-for-finnish-running.component.scss',
})
/** Edits a running time as separate minute, second, and millisecond fields. */
export class TimeUsedForFinnishRunningComponent {
  /** Emits the current validity and total millisecond value of the time form. */
  somethingChange = output<TimeUsedForFinnishRunningEvent>();

  /** Signal-based data model for the time fields. */
  protected readonly timeModel = signal({
    minutes: '',
    seconds: '',
    milliseconds: '',
  });

  /** Signal form for validating time inputs. */
  protected readonly timeForm = form(this.timeModel, (s) => {
    required(s.minutes);
    pattern(s.minutes, /^\d+$/);
    validate(s.minutes, ({ value }) => {
      const num = Number(value());
      if (!isNaN(num) && num < 0) {
        return { kind: 'min' };
      }
      return undefined;
    });

    required(s.seconds);
    pattern(s.seconds, /^\d+$/);
    validate(s.seconds, ({ value }) => {
      const num = Number(value());
      if (!isNaN(num)) {
        if (num < 0) {
          return { kind: 'min' };
        }
        if (num > 59) {
          return { kind: 'max' };
        }
      }
      return undefined;
    });

    required(s.milliseconds);
    pattern(s.milliseconds, /^\d+$/);
    validate(s.milliseconds, ({ value }) => {
      const num = Number(value());
      if (!isNaN(num)) {
        if (num < 0) {
          return { kind: 'min' };
        }
        if (num > 999) {
          return { kind: 'max' };
        }
      }
      return undefined;
    });
  });

  private readonly TIME_UNIT = inject(TIME_UNIT);

  constructor() {
    effect(() => {
      const value = this.timeModel();
      const isInvalid = this.timeForm().invalid();

      if (isInvalid) {
        this.somethingChange.emit({ valid: false, time: -1 });
        return;
      }

      const time: Time = {
        minutes: Number(value.minutes),
        seconds: Number(value.seconds),
        milliseconds: Number(value.milliseconds),
      };

      const timeInMilliseconds =
        time.minutes * this.TIME_UNIT.SECOND_IN_MINUTE * this.TIME_UNIT.MILLISECONDS_IN_SECOND +
        time.seconds * this.TIME_UNIT.MILLISECONDS_IN_SECOND +
        time.milliseconds;

      this.somethingChange.emit({
        valid: true,
        time: timeInMilliseconds,
      });
    });
  }
}
