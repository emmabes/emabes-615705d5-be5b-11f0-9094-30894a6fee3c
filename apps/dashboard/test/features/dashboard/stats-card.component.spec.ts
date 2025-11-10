import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCardComponent } from '../../../src/app/features/dashboard/stats-card.component';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and value', () => {
    component.title = 'Total Tasks';
    component.value = 42;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Total Tasks');
    expect(compiled.querySelector('p:last-child').textContent).toBe('42');
  });

  it('should apply icon classes correctly', () => {
    component.iconClass = 'bg-blue-500';
    component.iconBgClass = 'bg-blue-100';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const iconContainer = compiled.querySelector('.p-3');
    const icon = compiled.querySelector('.w-6');

    expect(iconContainer.classList.contains('bg-blue-100')).toBe(true);
    expect(icon.classList.contains('bg-blue-500')).toBe(true);
  });

  it('should handle empty inputs gracefully', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('');
    expect(compiled.querySelector('p:last-child').textContent).toBe('0');
  });

  it('should render card structure correctly', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.bg-white.rounded-lg.shadow')).toBeTruthy();
    expect(compiled.querySelector('.flex.items-center')).toBeTruthy();
    expect(compiled.querySelector('.p-3.rounded-full')).toBeTruthy();
  });

  it('should update when input values change', () => {
    component.title = 'Initial Title';
    component.value = 10;
    fixture.detectChanges();

    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Initial Title');

    component.title = 'Updated Title';
    component.value = 20;
    fixture.detectChanges();

    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Updated Title');
    expect(compiled.querySelector('p:last-child').textContent).toBe('20');
  });
});