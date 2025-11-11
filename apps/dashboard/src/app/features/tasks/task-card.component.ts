import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./task-card.component.css'],
  template: `
    <div class="task-card">
      <h3 class="task-card-title">{{ task.name }}</h3>
      
      <div class="task-card-content">
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <div class="task-card-bar large"></div>
        </div>
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <div class="task-card-bar small"></div>
        </div>
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <div class="task-card-bar medium"></div>
        </div>
      </div>
    </div>
  `
})
export class TaskCardComponent {
  @Input() task!: Task;
}