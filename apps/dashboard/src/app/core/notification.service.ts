import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  
  get notifications() {
    return this.notifications$.asObservable();
  }

  showError(message: string, duration = 5000): void {
    this.addNotification({
      id: Date.now().toString(),
      type: 'error',
      message,
      duration
    });
  }

  showSuccess(message: string, duration = 3000): void {
    this.addNotification({
      id: Date.now().toString(),
      type: 'success',
      message,
      duration
    });
  }

  private addNotification(notification: Notification): void {
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);
    
    if (notification.duration) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  removeNotification(id: string): void {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter(n => n.id !== id));
  }
}