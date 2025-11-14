import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from './task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="task-list-container">
      <div class="task-list-header">
        <h2 class="task-list-title">Tasks</h2>
        <p class="task-list-subtitle">Manage your tasks and track progress</p>
      </div>
      
      <div class="task-table" *ngIf="tasks.length > 0 && !isLoading && !errorMessage">
        <div class="task-table-header">
          <h3 class="task-table-title">All Tasks</h3>
        </div>
        <div class="task-rows">
          <div *ngFor="let task of tasks" 
               class="task-row"
               (mouseenter)="onDesktopHover(task, $event)"
               (mouseleave)="onDesktopLeave()"
               (click)="onMobileClick(task, $event)">
            <div class="task-row-content">
              <span class="task-name">{{ task.name }}</span>
              <span class="task-id">#{{ task.id }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading tasks...</p>
        </div>
      </div>

      <div *ngIf="errorMessage && !isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="text-4xl mb-4">⚠️</div>
          <p class="text-gray-600 mb-4">{{ errorMessage }}</p>
          <button (click)="retryLoadTasks()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>

      <div *ngIf="tasks.length === 0 && !isLoading && !errorMessage" class="empty-state">
        <div class="empty-state-icon">
          <svg class="empty-state-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4l3-3m-3 3l-3-3"></path>
          </svg>
        </div>
        <h3 class="empty-state-title">No tasks found</h3>
        <p class="empty-state-text">Create your first task to get started</p>
      </div>

      <!-- Hover Card -->
      <div *ngIf="hoveredTask" 
           class="hover-card"
           [class.mobile]="isMobile"
           [style.right.px]="hoverCardPosition.x"
           [style.top.px]="hoverCardPosition.y"
           (click)="hideHoverCard()">
        <app-task-card [task]="hoveredTask"></app-task-card>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() useMockData = false;
  
  tasks: Task[] = [];
  hoveredTask: Task | null = null;
  hoverCardPosition = { x: 0, y: 0 };
  isMobile = false;
  isLoading = false;
  errorMessage: string | null = null;
  private resizeObserver?: ResizeObserver;
  private tableRect?: DOMRect;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['useMockData']) {
      this.loadTasks();
    }
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
        this.tasks = tasks;
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

  private setupResizeObserver() {
    this.isMobile = window.innerWidth < 768;
    this.resizeObserver = new ResizeObserver(() => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      if (wasMobile !== this.isMobile) {
        this.hideHoverCard();
        this.tableRect = undefined;
        this.cdr.markForCheck();
      }
    });
    this.resizeObserver.observe(document.body);
  }

  onDesktopHover(task: Task, event: MouseEvent) {
    if (!this.isMobile) {
      this.showCard(task, event);
    }
  }

  onDesktopLeave() {
    if (!this.isMobile) {
      this.hideHoverCard();
    }
  }

  onMobileClick(task: Task, event: MouseEvent) {
    if (this.isMobile) {
      if (this.hoveredTask?.id === task.id) {
        this.hideHoverCard();
      } else {
        this.showCard(task, event);
      }
    }
  }

  showCard(task: Task, event: MouseEvent) {
    this.hoveredTask = task;
    this.hoverCardPosition = this.calculateCardPosition(event);
    this.cdr.markForCheck();
  }

  private calculateCardPosition(event: MouseEvent): { x: number, y: number } {
    this.ensureTableRectCached(event);
    
    const rowRect = this.getRowRect(event);
    const rightOffset = this.calculateRightOffset();
    
    return {
      x: rightOffset,
      y: (rowRect?.top || 0) - 20
    };
  }

  private ensureTableRectCached(event: MouseEvent): void {
    if (!this.tableRect) {
      this.tableRect = (event.target as HTMLElement).closest('.bg-white')?.getBoundingClientRect();
    }
  }

  private getRowRect(event: MouseEvent): DOMRect | undefined {
    return (event.target as HTMLElement).closest('div')?.getBoundingClientRect();
  }

  private calculateRightOffset(): number {
    const baseOffset = 20;
    
    if (this.isMobile || !this.tableRect) {
      return baseOffset;
    }
    
    return baseOffset + (this.tableRect.width * 0.2);
  }

  hideHoverCard() {
    this.hoveredTask = null;
    this.cdr.markForCheck();
  }
}