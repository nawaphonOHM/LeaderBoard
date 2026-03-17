import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAddNewRunnerButton } from './dashboard-add-new-runner-button';
import { DashBoardAddNewRunnerCoordinatorRadioTower } from '../../../services/dash-board-add-new-runner-coordinator-radio-tower';

describe('DashboardAddNewRunnerButton', () => {
  let component: DashboardAddNewRunnerButton;
  let fixture: ComponentFixture<DashboardAddNewRunnerButton>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTower;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerButton],
      providers: [DashBoardAddNewRunnerCoordinatorRadioTower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerButton);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTower);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit message when askForNewRunner is called', () => {
    spyOn(radioTower, 'emitMessage');
    component.askForNewRunner();
    expect(radioTower.emitMessage).toHaveBeenCalledWith({
      state: 'RESPONSE_DATA',
      data: null
    });
  });

  it('should call askForNewRunner when button is clicked', () => {
    spyOn(component, 'askForNewRunner');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.askForNewRunner).toHaveBeenCalled();
  });
});
