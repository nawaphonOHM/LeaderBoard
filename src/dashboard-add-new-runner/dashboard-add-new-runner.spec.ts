import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddNewRunner } from './dashboard-add-new-runner';

describe('DashboardAddNewRunner', () => {
  let component: DashboardAddNewRunner;
  let fixture: ComponentFixture<DashboardAddNewRunner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNewRunner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNewRunner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
