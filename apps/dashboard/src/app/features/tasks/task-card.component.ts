import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./task-card.component.css'],
  template: `
    <div class="task-card hover:shadow-lg hover:scale-105 transition-all duration-200">
      <h3 class="task-card-title">{{ task.name }}</h3>
      
      <div class="task-card-content">
        <!-- Status Field -->
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <span class="text-sm text-gray-600 mr-2">Status:</span>
          <div class="editable-field inline-block" 
               (click)="toggleEdit('status', $event)"
               (mouseenter)="setHover('status', true)"
               (mouseleave)="setHover('status', false)">
            <select *ngIf="editingField === 'status'" 
                    [(ngModel)]="task.status"
                    (change)="saveField('status')"
                    (keyup.enter)="saveField('status')"
                    (click)="$event.stopPropagation()"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <span *ngIf="editingField !== 'status'" 
                  class="px-3 py-1 text-sm rounded-full transition-all duration-200 cursor-pointer"
                  [class]="getStatusClass(task.status) + (hoveredField === 'status' ? ' ring-2 ring-blue-300 shadow-md' : '')">
              {{ task.status || 'Pending' }}
            </span>
          </div>
        </div>

        <!-- Due Date Field -->
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <span class="text-sm text-gray-600 mr-2">Due:</span>
          <div class="editable-field inline-block"
               (click)="toggleEdit('dueDate', $event)"
               (mouseenter)="setHover('dueDate', true)"
               (mouseleave)="setHover('dueDate', false)">
            <input *ngIf="editingField === 'dueDate'"
                   type="date"
                   [(ngModel)]="task.endDate"
                   (change)="saveField('dueDate')"
                   (keyup.enter)="saveField('dueDate')"
                   (click)="$event.stopPropagation()"
                   class="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span *ngIf="editingField !== 'dueDate'"
                  class="px-3 py-1 text-sm bg-gray-100 rounded cursor-pointer transition-all duration-200"
                  [class.ring-2]="hoveredField === 'dueDate'"
                  [class.ring-blue-300]="hoveredField === 'dueDate'"
                  [class.shadow-md]="hoveredField === 'dueDate'">
              {{ formatDate(task.endDate) }}
            </span>
          </div>
        </div>

        <!-- Priority Field -->
        <div class="task-card-item">
          <div class="task-card-bullet"></div>
          <span class="text-sm text-gray-600 mr-2">Priority:</span>
          <div class="editable-field inline-block"
               (click)="toggleEdit('priority', $event)"
               (mouseenter)="setHover('priority', true)"
               (mouseleave)="setHover('priority', false)">
            <select *ngIf="editingField === 'priority'"
                    [(ngModel)]="task.priority"
                    (change)="saveField('priority')"
                    (keyup.enter)="saveField('priority')"
                    (click)="$event.stopPropagation()"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span *ngIf="editingField !== 'priority'"
                  class="px-3 py-1 text-sm rounded-full transition-all duration-200 cursor-pointer"
                  [class]="getPriorityClass(task.priority) + (hoveredField === 'priority' ? ' ring-2 ring-blue-300 shadow-md' : '')">
              {{ task.priority || 'Medium' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskCardComponent {
  @Input() task!: Task;
  
  editingField: string | null = null;
  hoveredField: string | null = null;

  toggleEdit(field: string, event: Event) {
    event.stopPropagation();
    
    this.updateEditingState(field);
    
    if (this.editingField === field) {
      this.focusEditableElement(event);
    }
  }

  private updateEditingState(field: string): void {
    this.editingField = this.editingField === field ? null : field;
  }

  private focusEditableElement(event: Event): void {
    setTimeout(() => {
      const element = event.target as HTMLElement;
      const input = this.findEditableInput(element);
      if (input) {
        input.focus();
      }
    }, 10);
  }

  private findEditableInput(element: HTMLElement): HTMLInputElement | null {
    return element.closest('.editable-field')?.querySelector('input, select') as HTMLInputElement;
  }

  saveField(field: string) {
    this.editingField = null;
    // TODO: Implement API call to save changes
    this.logSafeMessage(`Saving ${field}`, { field, taskId: this.task.id });
  }

  setHover(field: string, isHovered: boolean) {
    this.hoveredField = isHovered ? field : null;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityClass(priority?: string): string {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  private logSafeMessage(message: string, data: any): void {
    const sanitizedData = {
      field: this.sanitizeString(data?.field || 'unknown'),
      taskId: typeof data?.taskId === 'number' ? data.taskId : 'unknown',
      timestamp: new Date().toISOString()
    };
    
    console.log(message, sanitizedData);
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