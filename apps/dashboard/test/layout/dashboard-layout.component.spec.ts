import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DashboardLayoutComponent } from '../../src/app/layout/dashboard-layout.component';
import { AuthService } from '../../src/app/auth/auth.service';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      logout: jest.fn(),
      currentUser$: { subscribe: jest.fn() },
      isAuthenticated: jest.fn().mockReturnValue(true)
    };

    const mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [DashboardLayoutComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render application title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Task Manager');
  });

  it('should render navigation menu', () => {
    const compiled = fixture.nativeElement;
    const navLinks = compiled.querySelectorAll('nav a');
    
    expect(navLinks.length).toBe(6); // 3 desktop + 3 mobile nav links
    expect(navLinks[0].textContent.trim()).toBe('Dashboard');
    expect(navLinks[1].textContent.trim()).toBe('Tasks');
    expect(navLinks[2].textContent.trim()).toBe('Settings');
  });

  it('should have active dashboard link', () => {
    const compiled = fixture.nativeElement;
    const activeLink = compiled.querySelector('nav a.border-blue-500');
    
    expect(activeLink.textContent.trim()).toBe('Dashboard');
  });

  it('should render main content area', () => {
    const compiled = fixture.nativeElement;
    const mainContent = compiled.querySelector('main');
    
    expect(mainContent).toBeTruthy();
    expect(mainContent.querySelector('header h2').textContent).toBe('Dashboard');
  });

  it('should have content projection area', () => {
    const compiled = fixture.nativeElement;
    const contentArea = compiled.querySelector('.flex-1.overflow-y-auto');
    
    expect(contentArea).toBeTruthy();
  });
});