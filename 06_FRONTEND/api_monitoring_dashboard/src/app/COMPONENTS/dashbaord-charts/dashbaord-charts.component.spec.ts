import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordChartsComponent } from './dashbaord-charts.component';

describe('DashbaordChartsComponent', () => {
  let component: DashbaordChartsComponent;
  let fixture: ComponentFixture<DashbaordChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbaordChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbaordChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
