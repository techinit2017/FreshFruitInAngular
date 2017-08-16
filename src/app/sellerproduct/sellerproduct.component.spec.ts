import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerproductComponent } from './sellerproduct.component';

describe('SellerproductComponent', () => {
  let component: SellerproductComponent;
  let fixture: ComponentFixture<SellerproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
