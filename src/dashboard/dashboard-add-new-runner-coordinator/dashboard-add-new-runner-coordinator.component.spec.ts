import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardAddNewRunnerCoordinatorComponent } from './dashboard-add-new-runner-coordinator.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashboardStateService } from './dashboard-state.service';
import { DashboardTableData } from './dashboard-table-data';
import { of } from 'rxjs';

describe('DashboardAddNewRunnerCoordinatorComponent', () => {
  let component: DashboardAddNewRunnerCoordinatorComponent;
  let fixture: ComponentFixture<DashboardAddNewRunnerCoordinatorComponent>;
  let dashboardState: DashboardStateService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerCoordinatorComponent, MatDialogModule],
      providers: [DashboardStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerCoordinatorComponent);
    component = fixture.componentInstance;
    dashboardState = TestBed.inject(DashboardStateService);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when a new runner is requested', fakeAsync(() => {
    spyOn(component, 'openNewRunnerDialog').and.returnValue(Promise.resolve());

    dashboardState.requestNewRunner();

    tick();
    fixture.detectChanges();

    expect(component.openNewRunnerDialog).toHaveBeenCalled();
  }));

  it('should add the runner when the dialog is closed with data', async () => {
    const dialogResult: DashboardTableData = {
      firstName: 'John',
      lastName: 'Doe',
      nationalityUrlImage: 'us.png',
      timeUsedInMillisecond: 12345,
    };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(dialogResult) });
    spyOn(matDialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(dashboardState, 'addRunner');

    await component.openNewRunnerDialog();

    expect(matDialog.open).toHaveBeenCalled();
    expect(dashboardState.addRunner).toHaveBeenCalledWith(dialogResult);
  });

  it('should not add a runner when the dialog is cancelled', async () => {
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(undefined) });
    spyOn(matDialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(dashboardState, 'addRunner');

    await component.openNewRunnerDialog();

    expect(dashboardState.addRunner).not.toHaveBeenCalled();
  });
});
