import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesComponent } from './project.component';

describe('MemoriesComponent', () => {
  let component: MemoriesComponent;
  let fixture: ComponentFixture<MemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
