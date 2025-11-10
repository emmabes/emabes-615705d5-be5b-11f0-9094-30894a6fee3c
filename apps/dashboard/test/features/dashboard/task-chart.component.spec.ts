import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskChartComponent } from '../../../src/app/features/dashboard/task-chart.component';

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    data: { labels: [], datasets: [{ data: [] }] },
    update: jest.fn(),
    destroy: jest.fn()
  })),
  registerables: []
}));

describe('TaskChartComponent', () => {
  let component: TaskChartComponent;
  let fixture: ComponentFixture<TaskChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskChartComponent);
    component = fixture.componentInstance;

    // Mock canvas context
    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({})
    };
    component.chartCanvas = { nativeElement: mockCanvas } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default groupBy', () => {
    expect(component.groupBy).toBe('status');
  });

  it('should handle tasks input', () => {
    const tasks = [{ id: 1, name: 'Test Task' }];
    component.tasks = tasks;
    expect(component.tasks).toEqual(tasks);
  });

  it('should create chart after view init', () => {
    component.ngAfterViewInit();
    expect(component.chart).toBeTruthy();
  });

  it('should update chart when groupBy changes', () => {
    component.ngAfterViewInit();
    const updateSpy = jest.spyOn(component.chart!, 'update');
    component.updateChart();
    expect(updateSpy).toHaveBeenCalled();
  });
});