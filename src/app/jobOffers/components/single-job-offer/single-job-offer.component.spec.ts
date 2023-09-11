import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobOfferComponent } from './single-job-offer.component';

describe('SingleJobOfferComponent', () => {
  let component: SingleJobOfferComponent;
  let fixture: ComponentFixture<SingleJobOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleJobOfferComponent]
    });
    fixture = TestBed.createComponent(SingleJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
