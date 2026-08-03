import { Component, input } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-input',
  imports: [MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './general-input.component.html',
  styleUrl: './general-input.component.scss',
})
/** Reusable labeled text input bound to an Angular reactive form control. */
export class GeneralInputComponent {
  /** Reactive form control rendered by the input component. */
  inputSignal = input.required<FormControl>({ alias: 'input' });

  /** Optional validation message shown beneath the input. */
  errorMessage = input<string>();

  /** Text displayed as the input's associated label. */
  label = input.required<string>();
}
