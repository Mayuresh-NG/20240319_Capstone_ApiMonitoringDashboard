import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDataComponent } from './alert-data.component';

describe('AlertDataComponent', () => {
  let component: AlertDataComponent;
  let fixture: ComponentFixture<AlertDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
