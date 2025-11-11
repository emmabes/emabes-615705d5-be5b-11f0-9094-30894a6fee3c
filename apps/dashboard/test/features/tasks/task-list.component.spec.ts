import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { TaskListComponent } from '../../../src/app/features/tasks/task-list.component';
import { TaskService } from '../../../src/app/services/task.service';
import { Task } from '../../../src/app/models/task.model';
import { createMockTask } from '../../helpers/mock-task.helper';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    const spy = {
      getTasks: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [{ provide: TaskService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const mockTasks: Task[] = [
      createMockTask(1, 'Test Task 1'),
      createMockTask(2, 'Test Task 2')
    ];
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should handle error when loading tasks', () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockTaskService.getTasks.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error loading tasks:', expect.any(Error));
  });

  it('should display tasks in template', () => {
    const mockTasks: Task[] = [createMockTask(1, 'Test Task')];
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Task');
  });

  it('should show no tasks message when empty', () => {
    mockTaskService.getTasks.mockReturnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No tasks found');
  });
});