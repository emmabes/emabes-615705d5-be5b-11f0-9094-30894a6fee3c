import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecentTasksComponent } from '../../../src/app/features/dashboard/recent-tasks.component';
import { createMockTask } from '../../helpers/mock-task.helper';

describe('RecentTasksComponent', () => {
  let component: RecentTasksComponent;
  let fixture: ComponentFixture<RecentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTasksComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTasksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toBe('Recent Tasks');
  });

  it('should display tasks when provided', () => {
    component.tasks = [
      createMockTask(1, 'Task 1'),
      createMockTask(2, 'Task 2')
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const taskElements = compiled.querySelectorAll('.bg-gray-50');
    
    expect(taskElements.length).toBe(2);
    expect(taskElements[0].querySelector('p').textContent).toBe('Task 1');
    expect(taskElements[1].querySelector('p').textContent).toBe('Task 2');
  });

  it('should display task IDs correctly', () => {
    component.tasks = [createMockTask(123, 'Test Task')];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const taskIdElement = compiled.querySelector('.text-sm.text-gray-600');
    
    expect(taskIdElement.textContent).toBe('Task #123');
  });

  it('should render empty list when no tasks provided', () => {
    component.tasks = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const taskElements = compiled.querySelectorAll('.bg-gray-50');
    
    expect(taskElements.length).toBe(0);
  });

  it('should render status badges for all tasks', () => {
    component.tasks = [
      createMockTask(1, 'Task 1'),
      createMockTask(2, 'Task 2')
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const badges = compiled.querySelectorAll('.bg-yellow-100.text-yellow-800');
    
    expect(badges.length).toBe(2);
    badges.forEach((badge: Element) => {
      expect(badge.textContent?.trim()).toBe('pending');
    });
  });

  it('should handle empty task list', () => {
    component.tasks = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const taskElements = compiled.querySelectorAll('.bg-gray-50');
    
    expect(taskElements.length).toBe(0);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});