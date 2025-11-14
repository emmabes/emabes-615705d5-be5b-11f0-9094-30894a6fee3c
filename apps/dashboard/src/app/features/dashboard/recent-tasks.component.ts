import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '../tasks/task-card.component';
import { AuthService } from '../../auth/auth.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-recent-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  template: `
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Recent Tasks</h3>
          <div class="flex space-x-3">
            <select [(ngModel)]="timePeriodFilter" (change)="applyFilters()" class="text-sm border rounded px-2 py-1">
              <option value="week">This Week</option>
              <option value="sprint">This Sprint</option>
              <option value="month">This Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="year">Year</option>
            </select>
            <select [(ngModel)]="statusFilter" (change)="applyFilters()" class="text-sm border rounded px-2 py-1">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      <div class="p-6 relative">
        <div class="space-y-4">
          <div *ngFor="let task of filteredTasks" 
               class="grid grid-cols-4 items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
               (click)="toggleTaskCard(task, $event)">
            <div class="col-span-2">
              <p class="font-medium text-gray-900">{{ task.name }}</p>
              <p class="text-sm text-gray-600">Task #{{ task.id }}</p>
            </div>
            <div class="flex justify-center">
              <span class="px-3 py-1 text-xs font-medium rounded-full"
                    [ngClass]="getRoleTagClass(task)">
                {{ getUserRole(task) }}
              </span>
            </div>
            <div class="flex justify-center">
              <span class="px-3 py-1 text-xs font-medium rounded-full"
                    [ngClass]="getStatusTagClass(task.status)">
                {{ task.status || 'Active' }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Task Card Overlay -->
        <div *ngIf="selectedTask" 
             class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
             (click)="closeTaskCard()">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
               (click)="$event.stopPropagation()">
            <app-task-card [task]="selectedTask"></app-task-card>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecentTasksComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  
  filteredTasks: Task[] = [];
  selectedTask: Task | null = null;
  timePeriodFilter = 'month';
  statusFilter = 'all';
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.applyFilters();
  }

  ngOnChanges() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.tasks];
    
    filtered = this.applyStatusFilter(filtered);
    filtered = this.applyTimePeriodFilter(filtered);
    
    this.filteredTasks = filtered;
  }

  private applyStatusFilter(tasks: Task[]): Task[] {
    if (this.statusFilter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.status === this.statusFilter);
  }

  private applyTimePeriodFilter(tasks: Task[]): Task[] {
    const endOfPeriod = this.calculateEndOfPeriod(this.timePeriodFilter);
    
    return tasks.filter(task => {
      if (!task.endDate) return true;
      const taskEndDate = new Date(task.endDate);
      return taskEndDate <= endOfPeriod;
    });
  }

  private calculateEndOfPeriod(period: string): Date {
    const today = new Date();
    const date = new Date(today);
    
    switch (period) {
      case 'week':
        return this.getEndOfWeek(date);
      case 'sprint':
        return this.getEndOfSprint(date);
      case 'month':
        return this.getEndOfMonth(date);
      case '3months':
        return this.addMonths(date, 3);
      case '6months':
        return this.addMonths(date, 6);
      case 'year':
        return this.addYears(date, 1);
      default:
        return new Date(2099, 11, 31);
    }
  }

  private getEndOfWeek(date: Date): Date {
    date.setDate(date.getDate() + (7 - date.getDay()));
    return date;
  }

  private getEndOfSprint(date: Date): Date {
    const daysUntilFriday = (5 - date.getDay() + 7) % 7 || 7;
    date.setDate(date.getDate() + daysUntilFriday + 7);
    return date;
  }

  private getEndOfMonth(date: Date): Date {
    date.setMonth(date.getMonth() + 1, 0);
    return date;
  }

  private addMonths(date: Date, months: number): Date {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  private addYears(date: Date, years: number): Date {
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  toggleTaskCard(task: Task, event: Event) {
    event.stopPropagation();
    this.selectedTask = this.selectedTask?.id === task.id ? null : task;
  }

  closeTaskCard() {
    this.selectedTask = null;
  }

  getUserRole(task: Task): string {
    if (!this.currentUser) return 'Viewer';
    
    if (task.adminId === this.currentUser.id) return 'Admin';
    if (task.ownerId === this.currentUser.id) return 'Owner';
    return 'Viewer';
  }

  getRoleTagClass(task: Task): string {
    const role = this.getUserRole(task);
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Owner': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusTagClass(status?: string): string {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  }
}