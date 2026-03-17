import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTable } from './dashboard-table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardAddNewRunnerCoordinatorRadioTower } from '../../../services/dash-board-add-new-runner-coordinator-radio-tower';
import { TIME_UNIT } from '../../../variables/timeUnit';
import { DashboardTableData } from '../../../interfaces/dashboard-table-data';

describe('DashboardTable', () => {
  let component: DashboardTable;
  let fixture: ComponentFixture<DashboardTable>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTower;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTable, NoopAnimationsModule],
      providers: [
        DashBoardAddNewRunnerCoordinatorRadioTower,
        {
          provide: TIME_UNIT,
          useValue: { MILLISECONDS_IN_SECOND: 1000, SECOND_IN_MINUTE: 60 }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTable);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTower);
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
      timeUsedInMillisecond: 50000
    };

    radioTower.emitMessage({
      state: 'SEND_REQUEST',
      data: newData
    });

    fixture.detectChanges();

    expect((component as any).data).toContain(newData);
    expect((component as any).sortedData.data).toContain(newData);
  });

  it('should not add data when state is not SEND_REQUEST', () => {
    const initialCount = (component as any).data.length;

    radioTower.emitMessage({
      state: 'OTHER',
      data: {}
    } as any);

    fixture.detectChanges();

    expect((component as any).data.length).toBe(initialCount);
  });
});
