import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterActiveAccountComponent } from './recruiter-active-account.component';

describe('RecruiterActiveAccountComponent', () => {
  let component: RecruiterActiveAccountComponent;
  let fixture: ComponentFixture<RecruiterActiveAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterActiveAccountComponent]
    });
    fixture = TestBed.createComponent(RecruiterActiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
