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
    component.input = new FormControl('') as any;
    component.label = 'Test Label';
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
    component.input = new FormControl('', { validators: [() => ({ required: true })] });
    component.errorMessage = 'Required field';
    component.input.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Required field');
  });
});
