import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddNewRunnerCoordinator } from './dashboard-add-new-runner-coordinator';

describe('DashboardAddNewRunnerCoordinator', () => {
  let component: DashboardAddNewRunnerCoordinator;
  let fixture: ComponentFixture<DashboardAddNewRunnerCoordinator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerCoordinator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerCoordinator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
