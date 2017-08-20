import { TestBed, inject } from '@angular/core/testing';

import { SellerproductService } from './sellerproduct.service';

describe('SellerproductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerproductService]
    });
  });

  it('should be created', inject([SellerproductService], (service: SellerproductService) => {
    expect(service).toBeTruthy();
  }));
});
