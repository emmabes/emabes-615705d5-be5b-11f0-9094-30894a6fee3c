import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskChartComponent } from './task-chart.component';
import { StatsCardComponent } from './stats-card.component';
import { RecentTasksComponent } from './recent-tasks.component';
import { TaskListComponent } from '../tasks/task-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, TaskChartComponent, StatsCardComponent, RecentTasksComponent, TaskListComponent],
  template: `
    <!-- Chart Section -->
    <div class="mb-8">
      <app-task-chart [tasks]="recentTasks"></app-task-chart>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      <app-stats-card 
        title="Total Tasks" 
        [value]="totalTasks"
        iconClass="bg-blue-500"
        iconBgClass="bg-blue-100">
      </app-stats-card>
      
      <app-stats-card 
        title="Completed" 
        [value]="completedTasks"
        iconClass="bg-green-500"
        iconBgClass="bg-green-100">
      </app-stats-card>
      
      <app-stats-card 
        title="Pending" 
        [value]="pendingTasks"
        iconClass="bg-yellow-500"
        iconBgClass="bg-yellow-100">
      </app-stats-card>
    </div>

    <!-- Recent Tasks -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
      <app-recent-tasks [tasks]="recentTasks"></app-recent-tasks>
      <app-task-list></app-task-list>
    </div>
  `
})
export class DashboardHomeComponent implements OnInit {
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  recentTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.recentTasks = tasks;
        this.totalTasks = tasks.length;
        this.completedTasks = 0; // Will be calculated when we add status
        this.pendingTasks = tasks.length;
      },
      error: (error) => console.error('Error loading tasks:', error)
    });
  }
}
