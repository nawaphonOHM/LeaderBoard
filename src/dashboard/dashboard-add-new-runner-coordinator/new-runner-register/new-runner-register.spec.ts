import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRunnerRegister } from './new-runner-register';

describe('NewRunnerRegister', () => {
  let component: NewRunnerRegister;
  let fixture: ComponentFixture<NewRunnerRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRunnerRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRunnerRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
