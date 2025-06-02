import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddNewRunnerButton } from './dashboard-add-new-runner-button';

describe('DashboardAddNewRunnerButton', () => {
  let component: DashboardAddNewRunnerButton;
  let fixture: ComponentFixture<DashboardAddNewRunnerButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunnerButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunnerButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
