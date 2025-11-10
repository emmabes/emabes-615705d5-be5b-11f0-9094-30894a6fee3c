import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../features/tasks/task-list.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  template: `
    <app-task-list></app-task-list>
  `
})
export class TasksPageComponent {}