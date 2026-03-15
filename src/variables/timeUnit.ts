

export const MILLISECONDS_IN_SECOND = 1000;
export const SECOND_IN_MINUTE = 60;

export interface TheTimeUnit {
  MILLISECONDS_IN_SECOND: number;
  SECOND_IN_MINUTE: number;
}


export const TIME_UNIT = new InjectionToken<TheTimeUnit>('TIME_UNIT', {
  providedIn: 'root',
  factory: () => ({
    MILLISECONDS_IN_SECOND: 1000,
    SECOND_IN_MINUTE: 60
  })
})
