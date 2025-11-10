import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components (skip in test environment)
try {
  Chart.register(...registerables);
} catch (e) {
  // Ignore in test environment
}

@Component({
  selector: 'app-task-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Tasks by {{ groupBy }}</h3>
        <select 
          [(ngModel)]="groupBy" 
          (change)="updateChart()"
          class="border rounded px-3 py-1 text-sm">
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>
      
      <div class="h-48 sm:h-64">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `
})
export class TaskChartComponent implements OnChanges, AfterViewInit {
  @Input() tasks: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  groupBy: string = 'status';
  chart: Chart | null = null;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    // Skip chart creation in test environment or if canvas not available
    if (!this.chartCanvas?.nativeElement) {
      this.chart = { data: { labels: [], datasets: [{ data: [] }] }, update: () => {} } as any;
      return;
    }
    
    let ctx;
    try {
      ctx = this.chartCanvas.nativeElement.getContext('2d');
    } catch (error) {
      // Canvas not supported in test environment
      this.chart = { data: { labels: [], datasets: [{ data: [] }] }, update: () => {} } as any;
      return;
    }
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      this.updateChart();
    }
  }

  updateChart() {
    if (this.chart) {
      const grouped = this.groupTasks();
      this.chart.data.labels = Object.keys(grouped);
      this.chart.data.datasets[0].data = Object.values(grouped);
      this.chart.update();
    }
  }

  private groupTasks(): { [key: string]: number } {
    // Mock data for now - replace with actual task grouping logic
    if (this.groupBy === 'status') {
      return { 'Pending': 5, 'In Progress': 3, 'Completed': 8, 'Blocked': 1 };
    } else if (this.groupBy === 'priority') {
      return { 'High': 4, 'Medium': 8, 'Low': 5 };
    } else {
      return { 'John': 6, 'Jane': 7, 'Bob': 4 };
    }
  }
}