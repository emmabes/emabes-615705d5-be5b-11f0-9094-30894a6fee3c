import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../../src/app/services/task.service';
import { Task } from '../../src/app/models/task.interface';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, name: 'Test Task 1' },
      { id: 2, name: 'Test Task 2' }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});