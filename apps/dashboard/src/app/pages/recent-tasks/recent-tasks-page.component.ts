import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentTasksComponent } from '../../features/dashboard/recent-tasks.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-recent-tasks-page',
  standalone: true,
  imports: [CommonModule, RecentTasksComponent],
  template: `
    <div>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Recent Tasks</h2>
        <p class="text-gray-600">View your recently updated tasks</p>
      </div>
      
      <app-recent-tasks [tasks]="recentTasks"></app-recent-tasks>
    </div>
  `
})
export class RecentTasksPageComponent implements OnInit {
  recentTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadRecentTasks();
  }

  private loadRecentTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.recentTasks = tasks.slice(0, 5),
      error: (error) => console.error('Error loading recent tasks:', error)
    });
  }
}