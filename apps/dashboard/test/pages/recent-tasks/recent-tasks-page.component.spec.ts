import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecentTasksPageComponent } from '../../../src/app/pages/recent-tasks/recent-tasks-page.component';
import { TaskService } from '../../../src/app/services/task.service';
import { Task } from '../../../src/app/models/task.interface';

describe('RecentTasksPageComponent', () => {
  let component: RecentTasksPageComponent;
  let fixture: ComponentFixture<RecentTasksPageComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    const spy = {
      getTasks: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RecentTasksPageComponent],
      providers: [{ provide: TaskService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTasksPageComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recent tasks on init', () => {
    const mockTasks: Task[] = [
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' },
      { id: 3, name: 'Task 3' }
    ];
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.recentTasks).toEqual(mockTasks.slice(0, 5));
  });

  it('should handle error when loading tasks', () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockTaskService.getTasks.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error loading recent tasks:', expect.any(Error));
  });

  it('should limit to 5 recent tasks', () => {
    const mockTasks: Task[] = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Task ${i + 1}` }));
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.recentTasks).toHaveLength(5);
  });
});