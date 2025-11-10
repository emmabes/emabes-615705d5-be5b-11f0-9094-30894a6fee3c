import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskCardComponent } from './task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  styleUrls: ['./task-list.component.css'],
  template: `
    <div class="task-list-container">
      <div class="task-list-header">
        <h2 class="task-list-title">Tasks</h2>
        <p class="task-list-subtitle">Manage your tasks and track progress</p>
      </div>
      
      <div class="task-table" *ngIf="tasks.length > 0">
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
      
      <div *ngIf="tasks.length === 0" class="empty-state">
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
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  hoveredTask: Task | null = null;
  hoverCardPosition = { x: 0, y: 0 };
  isMobile = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
    this.checkIfMobile();
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error('Error loading tasks:', error)
    });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
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
    const rowRect = (event.target as HTMLElement).closest('div')?.getBoundingClientRect();
    const tableRect = (event.target as HTMLElement).closest('.bg-white')?.getBoundingClientRect();
    
    let rightOffset = 20; // Default mobile offset
    
    if (!this.isMobile && tableRect) {
      // Move left by 20% of table width on desktop
      const tableWidth = tableRect.width;
      rightOffset = 20 + (tableWidth * 0.2);
    }
    
    this.hoverCardPosition = {
      x: rightOffset,
      y: (rowRect?.top || 0) - 20
    };
  }

  hideHoverCard() {
    this.hoveredTask = null;
  }
}