import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifAlertComponent } from './notif-alert.component';

describe('NotifAlertComponent', () => {
  let component: NotifAlertComponent;
  let fixture: ComponentFixture<NotifAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
