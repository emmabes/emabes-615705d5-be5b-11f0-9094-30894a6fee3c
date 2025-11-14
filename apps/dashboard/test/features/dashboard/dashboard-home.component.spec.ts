import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { DashboardHomeComponent } from '../../../src/app/features/dashboard/dashboard-home.component';
import { TaskService } from '../../../src/app/services/task.service';
import { Task } from '../../../src/app/models/task.model';
import { createMockTask } from '../../helpers/mock-task.helper';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    const spy = {
      getTasks: jest.fn(),
      getMockTasks: jest.fn()
    };

    const mockCdr = {
      markForCheck: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: spy },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks and update stats on init', () => {
    const mockTasks: Task[] = [
      createMockTask(1, 'Task 1'),
      createMockTask(2, 'Task 2'),
      createMockTask(3, 'Task 3')
    ];
    mockTaskService.getTasks.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.recentTasks).toEqual(mockTasks);
    expect(component.totalTasks).toBe(3);
    expect(component.pendingTasks).toBe(3);
    expect(component.completedTasks).toBe(0);
  });

  it('should handle error when loading tasks', () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockTaskService.getTasks.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error loading tasks', expect.objectContaining({
      message: expect.any(String),
      status: expect.any(String),
      timestamp: expect.any(String)
    }));
  });

  it('should initialize with default values', () => {
    expect(component.totalTasks).toBe(0);
    expect(component.completedTasks).toBe(0);
    expect(component.pendingTasks).toBe(0);
    expect(component.recentTasks).toEqual([]);
  });
});