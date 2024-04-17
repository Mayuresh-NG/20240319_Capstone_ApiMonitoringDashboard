import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseChartComponent } from './response-chart.component';

describe('ResponseChartComponent', () => {
  let component: ResponseChartComponent;
  let fixture: ComponentFixture<ResponseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
