import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { map } from 'lodash';
import { Subscription } from 'rxjs';
import { IProduct } from '../product';

import { CakeMenuService } from './cake-menu.service';

describe('CakeMenuService', () => {
  let service: CakeMenuService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
     providers: [
      CakeMenuService
     ]
    });
    
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CakeMenuService);
   
  });

  describe('getProduct()',() => {
    it('should call get with correct url and method',() => {
     
      service.getProduct(4).subscribe();
      //service.getProduct(2).subscribe();
      const req = httpTestingController.expectOne('api/products/4')
      expect(req.request.method).toEqual("GET")
      httpTestingController.verify();
    })
  })

  describe('getProducts()',() => {
    it('should call get with correct url and method',() => {
     
      service.getProducts().subscribe();
      //service.getProduct(2).subscribe();
      const req = httpTestingController.expectOne('api/products')
      expect(req.request.method).toEqual("GET")
      httpTestingController.verify();
    })
  })

  describe('updateProduct()',() => {
    it('should call put with correct url and method',() => {
      let product: IProduct = {
        "id": 4,
        "productName": "Choco Lava",
        "productPrice": 100,
        "productType": "Cake",
        "productOccasion": "Birthday",
        "productWeight": "1Kg",
        "starRating": 4,
        "imageUrl": "assets/images/chocolava.jpg"
      }
      service.updateProduct(product).subscribe();
      //service.getProduct(2).subscribe();
      const req = httpTestingController.expectOne('api/products/4')
      expect(req.request.method).toEqual("PUT")
      httpTestingController.verify();
    })
  })

  describe('createProduct()',() => {
    it('should call post with correct url and method',() => {
      let product: IProduct = {
        "id": 4,
        "productName": "Choco Lava",
        "productPrice": 100,
        "productType": "Cake",
        "productOccasion": "Birthday",
        "productWeight": "1Kg",
        "starRating": 4,
        "imageUrl": "assets/images/chocolava.jpg"
      }
      service.createProduct(product).subscribe();
      //service.getProduct(2).subscribe();
      const req = httpTestingController.expectOne('api/products')
      expect(req.request.method).toEqual("POST")
      httpTestingController.verify();
    })
  })
  
});
