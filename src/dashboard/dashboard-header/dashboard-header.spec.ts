import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeader } from './dashboard-header';

describe('DashboardHeader', () => {
  let component: DashboardHeader;
  let fixture: ComponentFixture<DashboardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
