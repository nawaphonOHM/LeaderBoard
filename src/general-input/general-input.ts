import {Component, Input} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-general-input',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField
  ],
  templateUrl: './general-input.html',
  styleUrl: './general-input.scss'
})
export class GeneralInput {

  @Input({required: true}) input!: FormControl;

  @Input({ required: false }) errorMessage: string | null = null;

  @Input({ required: true }) label!: string;

}
