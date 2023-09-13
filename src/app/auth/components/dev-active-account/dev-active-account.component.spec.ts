import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevActiveAccountComponent } from './dev-active-account.component';

describe('ActiveAccountComponent', () => {
  let component: DevActiveAccountComponent;
  let fixture: ComponentFixture<DevActiveAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevActiveAccountComponent]
    });
    fixture = TestBed.createComponent(DevActiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
