import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: any): void {
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        this.handleHttpError(error);
      } else {
        this.handleClientError(error);
      }
    });
  }

  private handleHttpError(error: HttpErrorResponse): void {
    console.error('HTTP Error:', {
      status: error.status,
      message: error.message,
      url: error.url
    });
    
    this.showErrorNotification(this.getHttpErrorMessage(error));
  }

  private handleClientError(error: Error): void {
    console.error('Client Error:', error);
    this.showErrorNotification('An unexpected error occurred. Please refresh the page.');
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Connection lost. Please check your internet connection.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    return 'Something went wrong. Please try again.';
  }

  private showErrorNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 5000);
  }
}