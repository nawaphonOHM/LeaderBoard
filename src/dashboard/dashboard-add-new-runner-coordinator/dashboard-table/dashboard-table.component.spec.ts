import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTableComponent } from './dashboard-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardStateService } from '../dashboard-state.service';
import { TIME_UNIT } from '../time-unit';
import { DashboardTableData } from '../dashboard-table-data';

describe('DashboardTableComponent', () => {
  let component: DashboardTableComponent;
  let fixture: ComponentFixture<DashboardTableComponent>;
  let dashboardState: DashboardStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTableComponent, NoopAnimationsModule],
      providers: [
        DashboardStateService,
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTableComponent);
    component = fixture.componentInstance;
    dashboardState = TestBed.inject(DashboardStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect runners added to the dashboard state', () => {
    const newData: DashboardTableData = {
      firstName: 'Jane',
      lastName: 'Smith',
      nationalityUrlImage: 'us.png',
      timeUsedInMillisecond: 50000,
    };

    dashboardState.addRunner(newData);

    fixture.detectChanges();

    expect(component['sortedData'].data).toContain(newData);
  });

  it('should not duplicate runners when the view updates', () => {
    const newData: DashboardTableData = {
      firstName: 'Jane',
      lastName: 'Smith',
      nationalityUrlImage: 'us.png',
      timeUsedInMillisecond: 50000,
    };

    dashboardState.addRunner(newData);

    fixture.detectChanges();
    fixture.detectChanges();

    expect(component['sortedData'].data).toEqual([newData]);
  });
});
