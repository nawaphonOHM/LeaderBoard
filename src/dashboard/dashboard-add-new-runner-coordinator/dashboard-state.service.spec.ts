import { TestBed } from '@angular/core/testing';
import { DashboardStateService } from './dashboard-state.service';
import { DashboardTableData } from './dashboard-table-data';

describe('DashboardStateService', () => {
  let service: DashboardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose runners as an empty list initially', () => {
    expect(service.runners()).toEqual([]);
  });

  it('should add runners without mutating the previous list', () => {
    const runner: DashboardTableData = {
      firstName: 'Jane',
      lastName: 'Smith',
      nationalityUrlImage: 'us.png',
      timeUsedInMillisecond: 50000,
    };

    service.addRunner(runner);

    expect(service.runners()).toEqual([runner]);
  });

  it('should emit a request only when requested', () => {
    const requestSpy = jasmine.createSpy('request');
    service.newRunnerRequested$.subscribe(requestSpy);

    service.requestNewRunner();

    expect(requestSpy).toHaveBeenCalledTimes(1);
  });

  it('should not replay an old request to a later subscriber', () => {
    service.requestNewRunner();
    const requestSpy = jasmine.createSpy('request');

    service.newRunnerRequested$.subscribe(requestSpy);

    expect(requestSpy).not.toHaveBeenCalled();
  });
});
