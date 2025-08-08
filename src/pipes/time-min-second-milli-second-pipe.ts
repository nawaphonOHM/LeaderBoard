import {Pipe, PipeTransform} from '@angular/core';
import {MILLISECONDS_IN_SECOND, SECOND_IN_MINUTE} from '../variables/timeUnit';

@Pipe({
  name: 'timeMinSecondMilliSecond'
})
export class TimeMinSecondMilliSecondPipe implements PipeTransform {



  transform(value: number, ...args: unknown[]): string {
    // Ensure non-negative input and normalize null/undefined
    const totalMs = Math.max(value || 0, 0);

    const msPerMinute = MILLISECONDS_IN_SECOND * SECOND_IN_MINUTE;

    const minutes = Math.floor(totalMs / msPerMinute);
    const remainingAfterMinutes = totalMs % msPerMinute;

    const seconds = Math.floor(remainingAfterMinutes / MILLISECONDS_IN_SECOND);
    const milliseconds = remainingAfterMinutes % MILLISECONDS_IN_SECOND;

    // Format as minutes:seconds.milliseconds (e.g., 1:05.123)
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(3, '0')}`;
  }

}
