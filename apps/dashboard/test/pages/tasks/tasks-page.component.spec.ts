import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksPageComponent } from '../../../src/app/pages/tasks/tasks-page.component';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task list component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const taskListElement = compiled.querySelector('app-task-list');
    expect(taskListElement).toBeTruthy();
  });
});