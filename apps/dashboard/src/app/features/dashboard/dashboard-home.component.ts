import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskChartComponent } from './task-chart.component';
import { StatsCardComponent } from './stats-card.component';
import { RecentTasksComponent } from './recent-tasks.component';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, TaskChartComponent, StatsCardComponent, RecentTasksComponent],
  templateUrl: './dashboard-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit {
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  recentTasks: Task[] = [];
  useMockData = false;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
  }

  toggleMockData(useMockData: boolean) {
    this.useMockData = useMockData;
    this.loadTasks();
  }

  private loadTasks() {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.markForCheck();
    
    const taskObservable = this.useMockData 
      ? this.taskService.getMockTasks() 
      : this.taskService.getTasks();
      
    taskObservable.pipe(
      retry(2),
      catchError(error => {
        this.errorMessage = this.getErrorMessage(error);
        this.logError('Error loading tasks', error);
        return of([]);
      })
    ).subscribe({
      next: (tasks) => {
        this.recentTasks = tasks;
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(t => t.status === 'completed').length;
        this.pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Unable to connect to server. Please check your connection.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (error.status === 404) {
      return 'Tasks not found.';
    }
    return 'Failed to load tasks. Please try again.';
  }

  retryLoadTasks() {
    this.loadTasks();
  }

  private logError(message: string, error: any): void {
    const sanitizedError = {
      message: this.sanitizeString(error?.message || 'Unknown error'),
      status: error?.status || 'Unknown',
      timestamp: new Date().toISOString()
    };
    
    console.error(message, sanitizedError);
  }

  private sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') {
      return 'Invalid input';
    }
    
    return input
      .replace(/[\r\n\t]/g, ' ')
      .replace(/[\x00-\x1F\x7F]/g, '')
      .substring(0, 200);
  }
}
