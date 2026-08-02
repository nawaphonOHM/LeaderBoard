import { InjectionToken } from '@angular/core';

/** Conversion constants used when parsing and formatting elapsed time. */
export interface TheTimeUnit {
  /** Number of milliseconds in one second. */
  MILLISECONDS_IN_SECOND: number;

  /** Number of seconds in one minute. */
  SECOND_IN_MINUTE: number;
}

/** Injectable source of elapsed-time conversion constants. */
export const TIME_UNIT = new InjectionToken<TheTimeUnit>('TIME_UNIT', {
  providedIn: 'root',
  factory: () => ({
    MILLISECONDS_IN_SECOND: 1000,
    SECOND_IN_MINUTE: 60,
  }),
});
