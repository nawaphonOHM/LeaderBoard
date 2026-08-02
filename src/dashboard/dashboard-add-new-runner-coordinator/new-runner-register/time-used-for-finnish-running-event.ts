/** Result emitted by the elapsed-time editor whenever its form changes. */
export interface TimeUsedForFinnishRunningEvent {
  /** Whether all time fields currently contain valid values. */
  valid: boolean;

  /** Elapsed time in milliseconds, or `-1` while the editor is invalid. */
  time: number;
}
