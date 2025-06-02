import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeUsedForFinnishRunning } from './time-used-for-finnish-running';

describe('TimeUsedForFinnishRunning', () => {
  let component: TimeUsedForFinnishRunning;
  let fixture: ComponentFixture<TimeUsedForFinnishRunning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeUsedForFinnishRunning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeUsedForFinnishRunning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
