import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TIME_UNIT } from '../../time-unit';
import { TimeUsedForFinnishRunningEvent } from '../time-used-for-finnish-running-event';
import { startWith } from 'rxjs';
import { Time } from './time';

@Component({
  selector: 'app-time-used-for-finnish-running',
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatError],
  templateUrl: './time-used-for-finnish-running.component.html',
  styleUrl: './time-used-for-finnish-running.component.scss',
})
export class TimeUsedForFinnishRunningComponent implements OnInit {
  somethingChange = output<TimeUsedForFinnishRunningEvent>();

  protected readonly inputGroup = new FormGroup({
    minutes: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)],
    }),
    seconds: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(0),
        Validators.max(59),
      ],
    }),
    milliseconds: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(0),
        Validators.max(999),
      ],
    }),
  });

  private readonly TIME_UNIT = inject(TIME_UNIT);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.inputGroup.valueChanges
      .pipe(startWith(this.inputGroup.getRawValue()), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const value = this.inputGroup.getRawValue();

        if (this.inputGroup.invalid) {
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
