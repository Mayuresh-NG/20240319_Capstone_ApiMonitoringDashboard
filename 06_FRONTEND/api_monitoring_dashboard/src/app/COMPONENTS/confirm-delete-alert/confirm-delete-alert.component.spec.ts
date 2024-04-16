import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteAlertComponent } from './confirm-delete-alert.component';

describe('ConfirmDeleteAlertComponent', () => {
  let component: ConfirmDeleteAlertComponent;
  let fixture: ComponentFixture<ConfirmDeleteAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
