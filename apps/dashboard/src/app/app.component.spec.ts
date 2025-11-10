import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home.component';

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    data: { labels: [], datasets: [{ data: [] }] },
    update: jest.fn(),
    destroy: jest.fn()
  })),
  registerables: []
}));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, DashboardLayoutComponent, DashboardHomeComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should render dashboard title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Task Manager'
    );
  });

  it(`should have as title 'dashboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dashboard');
  });
});
