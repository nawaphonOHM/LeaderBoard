import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardAddNewRunnerCoordinatorComponent } from './dashboard-add-new-runner-coordinator.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashBoardAddNewRunnerCoordinatorRadioTowerService } from '../../services/dash-board-add-new-runner-coordinator-radio-tower.service';
import { of } from 'rxjs';

describe('DashboardAddNewRunnerCoordinatorComponent', () => {
  let component: DashboardAddNewRunnerCoordinatorComponent;
  let fixture: ComponentFixture<DashboardAddNewRunnerCoordinatorComponent>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTowerService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerCoordinatorComponent, MatDialogModule],
      providers: [DashBoardAddNewRunnerCoordinatorRadioTowerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerCoordinatorComponent);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when radio tower emits RESPONSE_DATA', fakeAsync(() => {
    spyOn(component, 'openNewRunnerDialog').and.returnValue(Promise.resolve());

    radioTower.emitMessage({
      state: 'RESPONSE_DATA',
      data: null
    });

    tick();
    fixture.detectChanges();

    expect(component.openNewRunnerDialog).toHaveBeenCalled();
  }));

  it('should emit SEND_REQUEST when dialog is closed with data', async () => {
    const dialogResult = { firstName: 'John' };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(dialogResult) });
    spyOn(matDialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(radioTower, 'emitMessage');

    await component.openNewRunnerDialog();

    expect(matDialog.open).toHaveBeenCalled();
    expect(radioTower.emitMessage).toHaveBeenCalledWith({
      state: 'SEND_REQUEST',
      data: dialogResult as unknown
    });
  });
});
