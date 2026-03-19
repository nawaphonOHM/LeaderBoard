import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralInput } from './general-input';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GeneralInput', () => {
  let component: GeneralInput;
  let fixture: ComponentFixture<GeneralInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInput, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInput);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('input', new FormControl(''));
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Test Label');
  });

  it('should show error message when control is invalid and touched', () => {
    const control = new FormControl('', { validators: [() => ({ required: true })] });
    fixture.componentRef.setInput('input', control);
    fixture.componentRef.setInput('errorMessage', 'Required field');
    control.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Required field');
  });
});
