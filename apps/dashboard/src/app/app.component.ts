import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home.component';

@Component({
  standalone: true,
  imports: [DashboardLayoutComponent, DashboardHomeComponent],
  selector: 'app-root',
  template: `
    <app-dashboard-layout (mockDataToggle)="onMockDataToggle($event)">
      <app-dashboard-home #dashboardHome></app-dashboard-home>
    </app-dashboard-layout>
  `,
})
export class AppComponent {
  title = 'dashboard';
  
  @ViewChild('dashboardHome') dashboardHome!: DashboardHomeComponent;

  onMockDataToggle(useMockData: boolean) {
    this.dashboardHome.toggleMockData(useMockData);
  }
}
