import {Component, input} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-general-input',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './general-input.component.html',
  styleUrl: './general-input.component.scss'
})
export class GeneralInputComponent {

  inputSignal = input.required<FormControl>({ alias: 'input' });

  errorMessage = input<string>();

  label = input.required<string>();

}
