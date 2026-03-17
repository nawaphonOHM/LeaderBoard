import { TimeMinSecondMilliSecondPipe } from './time-min-second-milli-second-pipe';
import { TestBed } from '@angular/core/testing';
import { TIME_UNIT } from '../variables/timeUnit';

describe('TimeMinSecondMilliSecondPipe', () => {
  let pipe: TimeMinSecondMilliSecondPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeMinSecondMilliSecondPipe,
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 }
        }
      ]
    });
    pipe = TestBed.inject(TimeMinSecondMilliSecondPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format 0 correctly', () => {
    expect(pipe.transform(0)).toBe('0:00.000');
  });

  it('should format milliseconds only correctly', () => {
    expect(pipe.transform(500)).toBe('0:00.500');
  });

  it('should format seconds correctly', () => {
    expect(pipe.transform(1000)).toBe('0:01.000');
    expect(pipe.transform(59000)).toBe('0:59.000');
  });

  it('should format minutes correctly', () => {
    expect(pipe.transform(60000)).toBe('1:00.000');
    expect(pipe.transform(61123)).toBe('1:01.123');
  });

  it('should format complex time correctly', () => {
    const time = (5 * 60 * 1000) + (42 * 1000) + 123;
    expect(pipe.transform(time)).toBe('5:42.123');
  });

  it('should handle negative values by floor to 0', () => {
    expect(pipe.transform(-100)).toBe('0:00.000');
  });
});
