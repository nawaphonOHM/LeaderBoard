import {Pipe, PipeTransform} from '@angular/core';
import {MILLISECONDS_IN_SECOND, SECOND_IN_MINUTE} from '../variables/timeUnit';

@Pipe({
  name: 'timeMinSecondMilliSecond'
})
export class TimeMinSecondMilliSecondPipe implements PipeTransform {



  transform(value: number, ...args: unknown[]): string {

    const minutes = Math.floor(value / (MILLISECONDS_IN_SECOND * SECOND_IN_MINUTE));
    const seconds = Math.floor(value / MILLISECONDS_IN_SECOND);
    const milliseconds = value % SECOND_IN_MINUTE;

    return `${minutes}.${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }

}
