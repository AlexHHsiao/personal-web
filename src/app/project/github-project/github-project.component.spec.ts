import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubProjectComponent } from './github-project.component';

describe('GithubProjectComponent', () => {
  let component: GithubProjectComponent;
  let fixture: ComponentFixture<GithubProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
