import { Component, input } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FieldTree, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-general-input',
  imports: [MatError, MatFormField, MatInput, MatLabel, FormField],
  templateUrl: './general-input.component.html',
  styleUrl: './general-input.component.scss',
})
/** Reusable labeled text input bound to an Angular Signal Form field tree. */
export class GeneralInputComponent {
  /** Signal form field tree rendered by the input component. */
  inputSignal = input.required<FieldTree<string>>({ alias: 'input' });

  /** Optional validation message shown beneath the input. */
  errorMessage = input<string>();

  /** Text displayed as the input's associated label. */
  label = input.required<string>();
}
