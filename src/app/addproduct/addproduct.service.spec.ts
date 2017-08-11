import  { TestBed, inject } from '@angular/core/testing';
import { AddProductService } from './addproduct.service';

describe('AddProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Add]
    });
  });

  it('should be created', inject([AddProductService], (service: AddProductService) => {
    expect(service).toBeTruthy();
  }));
});
