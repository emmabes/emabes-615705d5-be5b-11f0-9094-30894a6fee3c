import { Component } from '@angular/core';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home.component';

@Component({
  standalone: true,
  imports: [DashboardLayoutComponent, DashboardHomeComponent],
  selector: 'app-root',
  template: `
    <app-dashboard-layout>
      <app-dashboard-home></app-dashboard-home>
    </app-dashboard-layout>
  `,
})
export class AppComponent {
  title = 'dashboard';
}
