import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from '../../../src/app/features/tasks/task-card.component';
import { Task } from '../../../src/app/models/task.model';
import { createMockTask } from '../../helpers/mock-task.helper';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = createMockTask(1, 'Test Task');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Task');
  });

  it('should render 3 placeholder bullet points', () => {
    fixture.detectChanges();
    const bullets = fixture.nativeElement.querySelectorAll('.task-card-bullet');
    expect(bullets.length).toBe(3);
  });

  it('should render 3 placeholder bars', () => {
    fixture.detectChanges();
    const bars = fixture.nativeElement.querySelectorAll('.task-card-bar');
    expect(bars.length).toBe(3);
  });
});