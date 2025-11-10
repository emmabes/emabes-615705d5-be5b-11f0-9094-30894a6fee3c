import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b">
        <h3 class="text-lg font-medium text-gray-900">Recent Tasks</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div *ngFor="let task of tasks" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">{{ task.name }}</p>
              <p class="text-sm text-gray-600">Task #{{ task.id }}</p>
            </div>
            <span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecentTasksComponent {
  @Input() tasks: any[] = [];
}