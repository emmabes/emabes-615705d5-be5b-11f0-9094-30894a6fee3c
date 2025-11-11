import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RecentTasksPageComponent } from '../../../src/app/pages/recent-tasks/recent-tasks-page.component';
import { TaskService } from '../../../src/app/services/task.service';
import { Task } from '../../../src/app/models/task.model';
import { createMockTask } from '../../helpers/mock-task.helper';

describe('RecentTasksPageComponent', () => {
  let component: RecentTasksPageComponent;
  let fixture: ComponentFixture<RecentTasksPageComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    const spy = {
      getTasks: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RecentTasksPageComponent, HttpClientTestingModule],
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
      createMockTask(1, 'Task 1'),
      createMockTask(2, 'Task 2'),
      createMockTask(3, 'Task 3')
    ];
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.recentTasks).toEqual(mockTasks);
  });

  it('should handle error when loading tasks', () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockTaskService.getTasks.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error loading recent tasks:', expect.any(Error));
  });

  it('should limit to 5 recent tasks', () => {
    const mockTasks: Task[] = Array.from({ length: 10 }, (_, i) => createMockTask(i + 1, `Task ${i + 1}`));
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.recentTasks).toHaveLength(5);
  });
});