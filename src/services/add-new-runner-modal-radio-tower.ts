import {Injectable, signal} from '@angular/core';


export enum FORM_STATE {
  INPUTTING,
  SAVING,
  DONE,
  NOP
}

@Injectable({
  providedIn: 'root',
})
export class AddNewRunnerModalRadioTower {

  private readonly radio = signal<FORM_STATE>(FORM_STATE.NOP)

}
