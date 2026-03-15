import {inject, Pipe, PipeTransform} from '@angular/core';
import {TIME_UNIT} from '../variables/timeUnit';

@Pipe({
  name: 'timeMinSecondMilliSecond'
})
export class TimeMinSecondMilliSecondPipe implements PipeTransform {

  private readonly TIME_UNIT = inject(TIME_UNIT)



  transform(value: number, ...args: unknown[]): string {
    // Ensure non-negative input and normalize null/undefined
    const totalMs = Math.max(value || 0, 0);

    const msPerMinute = this.TIME_UNIT.MILLISECONDS_IN_SECOND * this.TIME_UNIT.SECOND_IN_MINUTE;

    const minutes = Math.floor(totalMs / msPerMinute);
    const remainingAfterMinutes = totalMs % msPerMinute;

    const seconds = Math.floor(remainingAfterMinutes / this.TIME_UNIT.MILLISECONDS_IN_SECOND);
    const milliseconds = remainingAfterMinutes % this.TIME_UNIT.MILLISECONDS_IN_SECOND;

    // Format as minutes:seconds.milliseconds (e.g., 1:05.123)
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(3, '0')}`;
  }

}
