import { inject, Pipe, PipeTransform } from '@angular/core';
import { TIME_UNIT } from '../time-unit';

@Pipe({
  name: 'timeMinSecondMilliSecond',
})
/** Formats elapsed milliseconds as minutes, seconds, and milliseconds. */
export class TimeMinSecondMilliSecondPipe implements PipeTransform {
  private readonly TIME_UNIT = inject(TIME_UNIT);

  /**
   * Converts elapsed time to the `minutes:seconds.milliseconds` format.
   *
   * @param value Elapsed time in milliseconds.
   * @returns A zero-padded elapsed-time string, clamped to zero for negative values.
   *
   * @example
   * `65001` becomes `1:05.001`.
   */
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
