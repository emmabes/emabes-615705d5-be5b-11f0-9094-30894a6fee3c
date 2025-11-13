import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home.component';
import { LoginComponent } from './auth/login.component';
import { AuthService } from './auth/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, DashboardHomeComponent, LoginComponent],
  selector: 'app-root',
  template: `
    <app-login *ngIf="!isAuthenticated"></app-login>
    <app-dashboard-layout *ngIf="isAuthenticated" (mockDataToggle)="onMockDataToggle($event)">
      <app-dashboard-home #dashboardHome></app-dashboard-home>
    </app-dashboard-layout>
  `,
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  isAuthenticated = false;
  
  @ViewChild('dashboardHome') dashboardHome!: DashboardHomeComponent;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user || this.authService.isAuthenticated();
    });
  }

  onMockDataToggle(useMockData: boolean) {
    this.dashboardHome.toggleMockData(useMockData);
  }
}
