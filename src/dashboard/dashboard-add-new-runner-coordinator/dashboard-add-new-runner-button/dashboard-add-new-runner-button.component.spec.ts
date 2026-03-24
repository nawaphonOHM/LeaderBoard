import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAddNewRunnerButtonComponent } from './dashboard-add-new-runner-button.component';
import { DashBoardAddNewRunnerCoordinatorRadioTowerService } from '../../../services/dash-board-add-new-runner-coordinator-radio-tower.service';

describe('DashboardAddNewRunnerButtonComponent', () => {
  let component: DashboardAddNewRunnerButtonComponent;
  let fixture: ComponentFixture<DashboardAddNewRunnerButtonComponent>;
  let radioTower: DashBoardAddNewRunnerCoordinatorRadioTowerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerButtonComponent],
      providers: [DashBoardAddNewRunnerCoordinatorRadioTowerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerButtonComponent);
    component = fixture.componentInstance;
    radioTower = TestBed.inject(DashBoardAddNewRunnerCoordinatorRadioTowerService);
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
