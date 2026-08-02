import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAddNewRunnerButtonComponent } from './dashboard-add-new-runner-button.component';
import { DashboardStateService } from '../dashboard-state.service';

describe('DashboardAddNewRunnerButtonComponent', () => {
  let component: DashboardAddNewRunnerButtonComponent;
  let fixture: ComponentFixture<DashboardAddNewRunnerButtonComponent>;
  let dashboardState: DashboardStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerButtonComponent],
      providers: [DashboardStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerButtonComponent);
    component = fixture.componentInstance;
    dashboardState = TestBed.inject(DashboardStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request a new runner when askForNewRunner is called', () => {
    spyOn(dashboardState, 'requestNewRunner');
    component.askForNewRunner();
    expect(dashboardState.requestNewRunner).toHaveBeenCalled();
  });

  it('should call askForNewRunner when button is clicked', () => {
    spyOn(component, 'askForNewRunner');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.askForNewRunner).toHaveBeenCalled();
  });
});
