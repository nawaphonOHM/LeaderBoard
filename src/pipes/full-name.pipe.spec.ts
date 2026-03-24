import { FullNamePipe } from './full-name.pipe';
import { DashboardTableData } from '../interfaces/dashboard-table-data';

describe('FullNamePipe', () => {
  let pipe: FullNamePipe;

  beforeEach(() => {
    pipe = new FullNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should join first and last name', () => {
    const data: DashboardTableData = {
      firstName: 'John',
      lastName: 'Doe',
      nationalityUrlImage: 'test.png',
      timeUsedInMillisecond: 1000,
    };
    expect(pipe.transform(data)).toBe('John Doe');
  });

  it('should handle empty names', () => {
    const data: DashboardTableData = {
      firstName: '',
      lastName: '',
      nationalityUrlImage: 'test.png',
      timeUsedInMillisecond: 0,
    };
    expect(pipe.transform(data)).toBe(' ');
  });
});
