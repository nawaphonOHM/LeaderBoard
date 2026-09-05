import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralInputComponent } from './general-input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { form, required } from '@angular/forms/signals';
import { signal } from '@angular/core';

describe('GeneralInputComponent', () => {
  let component: GeneralInputComponent;
  let fixture: ComponentFixture<GeneralInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInputComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInputComponent);
    component = fixture.componentInstance;
    const testModel = signal({ text: '' });
    const testForm = TestBed.runInInjectionContext(() => form(testModel));
    fixture.componentRef.setInput('input', testForm.text);
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
    const testModel = signal({ text: '' });
    const testForm = TestBed.runInInjectionContext(() =>
      form(testModel, (s) => {
        required(s.text);
      }),
    );
    fixture.componentRef.setInput('input', testForm.text);
    fixture.componentRef.setInput('errorMessage', 'Required field');
    testForm.text().markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Required field');
  });

  it('should not show error message when control is untouched and pristine', () => {
    const testModel = signal({ text: '' });
    const testForm = TestBed.runInInjectionContext(() =>
      form(testModel, (s) => {
        required(s.text);
      }),
    );
    fixture.componentRef.setInput('input', testForm.text);
    fixture.componentRef.setInput('errorMessage', 'Required field');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')).toBeNull();
  });

  it('should not show error message when control is valid even if touched', () => {
    const testModel = signal({ text: 'Valid Value' });
    const testForm = TestBed.runInInjectionContext(() =>
      form(testModel, (s) => {
        required(s.text);
      }),
    );
    fixture.componentRef.setInput('input', testForm.text);
    fixture.componentRef.setInput('errorMessage', 'Required field');
    testForm.text().markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')).toBeNull();
  });
});
