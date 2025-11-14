import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../core/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div *ngFor="let notification of notifications" 
           [class]="getNotificationClass(notification.type)"
           class="p-4 rounded shadow-lg max-w-sm">
        <div class="flex justify-between items-start">
          <span>{{ notification.message }}</span>
          <button (click)="remove(notification.id)" class="ml-2 text-lg">&times;</button>
        </div>
      </div>
    </div>
  `
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications.subscribe(
      notifications => this.notifications = notifications
    );
  }

  remove(id: string) {
    this.notificationService.removeNotification(id);
  }

  getNotificationClass(type: string): string {
    const baseClass = 'text-white';
    switch (type) {
      case 'error': return `${baseClass} bg-red-500`;
      case 'success': return `${baseClass} bg-green-500`;
      case 'warning': return `${baseClass} bg-yellow-500`;
      default: return `${baseClass} bg-blue-500`;
    }
  }
}