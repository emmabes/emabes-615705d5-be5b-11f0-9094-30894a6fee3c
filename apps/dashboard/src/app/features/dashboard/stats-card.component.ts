import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full" [ngClass]="iconBgClass">
          <div class="w-6 h-6 rounded" [ngClass]="iconClass"></div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">{{ title }}</p>
          <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
        </div>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() iconClass: string = '';
  @Input() iconBgClass: string = '';
}