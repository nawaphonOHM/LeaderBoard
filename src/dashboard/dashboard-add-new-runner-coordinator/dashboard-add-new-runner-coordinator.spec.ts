import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardAddNewRunnerCoordinator } from './dashboard-add-new-runner-coordinator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashBoardAddNewRunnerCoordinatorRadioTower } from '../../services/dash-board-add-new-runner-coordinator-radio-tower';
import { of } from 'rxjs';

describe('DashboardAddNewRunnerCoordinator', () => {
  let component: DashboardAddNewRunnerCoordinator;
  let fixture: ComponentFixture<DashboardAddNewRunnerCoordinator>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTower;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerCoordinator, MatDialogModule],
      providers: [DashBoardAddNewRunnerCoordinatorRadioTower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerCoordinator);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTower);
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
      data: dialogResult as any
    });
  });
});
