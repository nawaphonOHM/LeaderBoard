import { Component, inject, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  form,
  FormField,
  maxLength,
  min,
  pattern,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
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
    FormField,
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
  /** Signal-based data model for the runner. */
  protected readonly runnerModel = signal({
    firstName: '',
    lastName: '',
    nationality: {
      alpha2: '',
      alpha3: '',
      translations: {
        de: '',
        en: '',
        fr: '',
        it: '',
        es: '',
        ar: '',
        zh: '',
        hi: '',
        bn: '',
        pt: '',
        ru: '',
      },
    } as Country,
    timeUsedInMillisecond: -1,
  });

  /** Signal form for the runner identity, nationality, and finish time. */
  protected readonly runnerForm = form(this.runnerModel, (s) => {
    required(s.firstName, { message: 'Enter a first name' });
    pattern(s.firstName, /\S/, { message: 'Enter a first name' });
    maxLength(s.firstName, 80);

    required(s.lastName, { message: 'Enter a last name' });
    pattern(s.lastName, /\S/, { message: 'Enter a last name' });
    maxLength(s.lastName, 80);

    validate(s.nationality, ({ value }) =>
      !value()?.alpha2
        ? { kind: 'required', message: "Select the runner's nationality" }
        : undefined,
    );

    min(s.timeUsedInMillisecond, 0);
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
    submit(this.runnerForm, async () => {
      const rawInput = this.runnerModel();
      const nationalityCode = rawInput.nationality?.alpha2;
      const timeUsedInMillisecond = rawInput.timeUsedInMillisecond;

      if (!nationalityCode || timeUsedInMillisecond < 0) {
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
    });
  }

  /**
   * Synchronizes the child time editor's result with the registration form.
   *
   * @param newValue Validation state and millisecond value emitted by the time editor.
   */
  onTimeChange(newValue: TimeUsedForFinnishRunningEvent): void {
    this.runnerModel.update((m) => ({
      ...m,
      timeUsedInMillisecond: newValue.valid ? newValue.time : -1,
    }));
  }
}
