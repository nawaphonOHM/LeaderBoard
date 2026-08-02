/** Numeric components of an elapsed running time. */
export interface Time {
  /** Whole minutes in the elapsed time. */
  minutes: number;

  /** Remaining whole seconds in the elapsed time. */
  seconds: number;

  /** Remaining milliseconds after minutes and seconds are removed. */
  milliseconds: number;
}
