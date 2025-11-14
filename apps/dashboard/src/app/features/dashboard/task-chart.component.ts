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
    if (!this.isChartSupported()) {
      this.chart = this.createMockChart();
      return;
    }
    
    const ctx = this.getCanvasContext();
    if (ctx) {
      this.chart = new Chart(ctx, this.getChartConfiguration());
      this.updateChart();
    }
  }

  private isChartSupported(): boolean {
    return !!this.chartCanvas?.nativeElement;
  }

  private createMockChart(): any {
    return { 
      data: { labels: [], datasets: [{ data: [] }] }, 
      update: () => {} 
    };
  }

  private getCanvasContext(): CanvasRenderingContext2D | null {
    try {
      return this.chartCanvas.nativeElement.getContext('2d');
    } catch (error) {
      return null;
    }
  }

  private getChartConfiguration(): ChartConfiguration {
    return {
      type: 'doughnut',
      data: this.getInitialChartData(),
      options: this.getChartOptions()
    };
  }

  private getInitialChartData() {
    return {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
      }]
    };
  }

  private getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const
        }
      }
    };
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
    const grouped: { [key: string]: number } = {};
    
    if (!this.tasks || this.tasks.length === 0) {
      return grouped;
    }

    this.tasks.forEach(task => {
      let key: string;
      
      if (this.groupBy === 'status') {
        key = task.status || 'Unknown';
      } else if (this.groupBy === 'priority') {
        key = task.priority || 'Medium';
      } else { // assignee
        key = this.getOwnerName(task.ownerId) || 'Unassigned';
      }
      
      grouped[key] = (grouped[key] || 0) + 1;
    });
    
    return grouped;
  }

  private getOwnerName(ownerId: number): string {
    const owners = {
      1: 'admin',
      2: 'owner', 
      3: 'user'
    };
    return owners[ownerId as keyof typeof owners] || 'Unknown';
  }
}