import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable, of } from 'rxjs';
import { CakeMenuService } from '../cake-menu.service';

import { CakeDetailsComponent } from './cake-details.component';

describe('CakeDetailsComponent', () => {
    let fixture: ComponentFixture<CakeDetailsComponent>;
    let mockService: any;
    let router: Router;
    let mockActivatedRoute: any;
    let product = {
      "id": 4,
      "productName": "Choco Lava",
      "productPrice": 100,
      "productType": "Cake",
      "productOccasion": "Birthday",
      "productWeight": "1Kg",
      "starRating": 4,
      "imageUrl": "assets/images/chocolava.jpg"
    }

  beforeEach(() => {
    mockService = jasmine.createSpyObj(['getProduct']);
    mockActivatedRoute = {
      //snapshot: { paramMap: convertToParamMap({get: (param: Number) => { return '4'}})}
      //params: { subscribe: {get: (params: Params) => { return '4'}}}
      //snapshot: { paramMap: convertToParamMap(from([{id: 1}]))}
      // snapshot: {
      //   paramMap: convertToParamMap({
      //     id: '4'
      //   })
      // }
      //params: from([{id: 4}])
    }
  TestBed.configureTestingModule({
    declarations: [CakeDetailsComponent],
    imports: [RouterTestingModule.withRoutes([])],
    providers: [
      {provide: CakeMenuService, useValue: mockService},
      {
        provide: ActivatedRoute, 
        useValue: {
          snapshot: {
          paramMap: convertToParamMap({
            id: '4'
          })
        }
      }
      }    ]
  })

  fixture = TestBed.createComponent(CakeDetailsComponent);
  router = TestBed.inject(Router);
  });

  it('On Back Navigation Test', () => {
    const spy = spyOn(router,'navigate');
    fixture.componentInstance.onBack();
    expect(spy.calls.first().args[0]).toContain('cakes');
  })

  it('Checking whether getProducts is called',() => {
    mockService.getProduct.and.returnValue(from([product]))
    fixture.componentInstance.getProduct(4);
    fixture.detectChanges();
    expect(mockService.getProduct).toHaveBeenCalled();
  })

  it('should render the product name',() => {
    mockService.getProduct.and.returnValue(from([product]))
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('h3'));
    expect(debugElement.nativeElement.textContent).toContain("Choco");
    //expect(fixture.nativeElement.querySelector('h3').textContent).toContain('Choco');
})

  
});
