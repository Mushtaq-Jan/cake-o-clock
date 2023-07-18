import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeMenuComponent } from './cake-menu.component';
import { CakeMenuService } from './cake-menu.service';

describe('CakeMenuComponent', () => {
  let component: CakeMenuComponent;
  let fixture: ComponentFixture<CakeMenuComponent>;
  let mockService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getProducts']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CakeMenuComponent ],
      providers: [ {provide: CakeMenuService, useValue: mockService},
                    
                 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //fixture = TestBed.createComponent(CakeMenuComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    //component = fixture.componentInstance;
    
  });

  it('test',() => {
    expect(true).toBe(true);
  })
});
