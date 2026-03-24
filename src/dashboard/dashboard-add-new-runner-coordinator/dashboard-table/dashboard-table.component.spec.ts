import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTableComponent } from './dashboard-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardAddNewRunnerCoordinatorRadioTowerService } from '../../../services/dash-board-add-new-runner-coordinator-radio-tower.service';
import { TIME_UNIT } from '../../../variables/time-unit';
import { DashboardTableData } from '../../../interfaces/dashboard-table-data';

describe('DashboardTableComponent', () => {
  let component: DashboardTableComponent;
  let fixture: ComponentFixture<DashboardTableComponent>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTowerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTableComponent, NoopAnimationsModule],
      providers: [
        DashBoardAddNewRunnerCoordinatorRadioTowerService,
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTableComponent);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new data when radio tower emits SEND_REQUEST', () => {
    const newData: DashboardTableData = {
      firstName: 'Jane',
      lastName: 'Smith',
      nationalityUrlImage: 'us.png',
      timeUsedInMillisecond: 50000,
    };

    radioTower.emitMessage({
      state: 'SEND_REQUEST',
      data: newData,
    });

    fixture.detectChanges();

    expect((component as unknown as { data: DashboardTableComponent['data'] }).data).toContain(
      newData,
    );
    expect(
      (component as unknown as { sortedData: DashboardTableComponent['sortedData'] }).sortedData
        .data,
    ).toContain(newData);
  });

  it('should not add data when state is not SEND_REQUEST', () => {
    const initialCount = (component as unknown as { data: DashboardTableComponent['data'] }).data
      .length;

    radioTower.emitMessage({
      state: 'RESPONSE_DATA',
      data: null,
    });

    fixture.detectChanges();

    expect((component as unknown as { data: DashboardTableComponent['data'] }).data.length).toBe(
      initialCount,
    );
  });
});
