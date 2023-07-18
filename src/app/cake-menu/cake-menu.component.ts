import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, from, map, mergeMap, Observable, of, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { IProduct } from '../product';
import { CakeMenuService } from './cake-menu.service';

@Component({
  selector: 'app-cake-menu',
  templateUrl: './cake-menu.component.html',
  styleUrls: ['./cake-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CakeMenuComponent{

  categories = '';
  _listFilter = '';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private filteredSubject = new BehaviorSubject<string>("");
  filteredAction$ = this.filteredSubject.asObservable();

  filteredProducts$ = combineLatest([
    this.cakeService.getProducts(),
    this.filteredAction$
  ])
    .pipe(
        map(([products, filterBy]) =>
        products.filter(product =>
        (
          product.productName.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase()) 
          || 
          product.productType.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase()))
        )
      ),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  onFilterBy() {
    //this._listFilter = (event.target as HTMLInputElement).value;
    if (/^[a-zA-Z]+$/.test(this._listFilter)) {
      this.filteredSubject.next(this._listFilter);
    }
    else {
      this.filteredSubject.next("");
    }
    console.log(this._listFilter)
  }

  productCategory$ = this.cakeService.getProducts()
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private cakeService: CakeMenuService, private http: HttpClient) { }

  onClickCategories(category: string) {
    this.filteredSubject.next(category);
    console.log(category, "Clicked");
    this.checkMergeMap();
  }

  onClickAllCategories() {
    this.filteredSubject.next("");
    this.checkMergeMap();
    this.checkSwitchMap();
     }

   
//MergeMap
getCategory(data: any) {
  return of("Products of category "+data+" has been listed" );
}

checkMergeMap() {
  console.log("Merge Map")
  this.filteredProducts$.pipe(
   mergeMap(res => this.getCategory(res.map(product => product.productType)))
   
  ).subscribe(res => {
    console.log(res);
  })
}

//SwitchMap
 source = of(1,2,3);
checkSwitchMap() {
  console.log("Switch Map")
  
  this.source.pipe(
    switchMap(id => 
   this.http.get<IProduct>(`api/products/${id}`))
  ).subscribe(res => console.log(res));
}

}
