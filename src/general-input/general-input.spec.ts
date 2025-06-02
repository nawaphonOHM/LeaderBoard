import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInput } from './general-input';

describe('GeneralInput', () => {
  let component: GeneralInput;
  let fixture: ComponentFixture<GeneralInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
