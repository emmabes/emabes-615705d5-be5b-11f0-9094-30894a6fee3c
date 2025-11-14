import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ErrorHandler } from '@angular/core';
import { AppComponent } from './app/app.component';
import { GlobalErrorHandler } from './app/core/error-handler.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([]),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
}).catch((err) => {
  const sanitizedError = {
    message: typeof err?.message === 'string' ? err.message.replace(/[\r\n\t]/g, ' ').substring(0, 200) : 'Unknown bootstrap error',
    timestamp: new Date().toISOString()
  };
  console.error('Bootstrap Error:', sanitizedError);
});
