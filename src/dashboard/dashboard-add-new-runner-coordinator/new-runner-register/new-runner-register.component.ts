import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { GeneralInputComponent } from './general-input/general-input.component';
import { Country, CountrySelectComponent } from '@wlucha/ng-country-select';
import { TimeUsedForFinnishRunningComponent } from './time-used-for-finnish-running/time-used-for-finnish-running.component';
import { CONFIGURATION, ConfigurationMain } from './configurations';
import { TimeUsedForFinnishRunningEvent } from './time-used-for-finnish-running-event';
import { DashboardTableData } from '../dashboard-table-data';

@Component({
  selector: 'app-new-runner-register',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    GeneralInputComponent,
    CountrySelectComponent,
    TimeUsedForFinnishRunningComponent,
  ],
  templateUrl: './new-runner-register.component.html',
  styleUrl: './new-runner-register.component.scss',
  providers: [{ provide: CONFIGURATION, useValue: ConfigurationMain }],
})
/** Collects and validates the data needed to add a runner to the leaderboard. */
export class NewRunnerRegisterComponent {
  /** Form controls for the runner identity, nationality, and finish time. */
  protected readonly inputGroup = new FormGroup({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)],
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)],
    }),
    nationality: new FormControl<Country | null>(null, {
      nonNullable: false,
      validators: [Validators.required],
    }),
    timeUsedInMillisecond: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  private readonly matDialog = inject(MatDialogRef<NewRunnerRegisterComponent, DashboardTableData>);

  private readonly configuration = inject(CONFIGURATION);

  /** Closes the registration dialog without adding a runner. */
  cancelCallback(): void {
    this.matDialog.close();
  }

  /**
   * Validates the form and closes the dialog with a normalized runner record.
   *
   * @remarks
   * Invalid forms remain open and are marked as touched so their validation
   * messages become visible.
   */
  save(): void {
    if (this.inputGroup.invalid) {
      this.inputGroup.markAllAsTouched();
      return;
    }

    const rawInput = this.inputGroup.getRawValue();
    const nationalityCode = rawInput.nationality?.alpha2;
    const timeUsedInMillisecond = rawInput.timeUsedInMillisecond;

    if (nationalityCode === undefined || timeUsedInMillisecond === null) {
      this.inputGroup.markAllAsTouched();
      return;
    }

    this.matDialog.close({
      firstName: rawInput.firstName.trim(),
      lastName: rawInput.lastName.trim(),
      nationalityUrlImage: this.configuration.flagUrl.replaceAll(
        '__nationality__',
        nationalityCode.toUpperCase(),
      ),
      timeUsedInMillisecond,
    });
  }

  /**
   * Synchronizes the child time editor's result with the registration form.
   *
   * @param newValue Validation state and millisecond value emitted by the time editor.
   */
  onTimeChange(newValue: TimeUsedForFinnishRunningEvent): void {
    if (!newValue.valid) {
      this.inputGroup.controls.timeUsedInMillisecond.setValue(null);
    } else {
      this.inputGroup.controls.timeUsedInMillisecond.setValue(newValue.time);
    }
  }
}
