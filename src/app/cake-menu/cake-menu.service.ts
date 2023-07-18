import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge } from 'lodash';
import { catchError,scan, concatMap, map, Observable, of, shareReplay, Subject, tap, throwError, BehaviorSubject, retryWhen, delay } from 'rxjs';
import { IProduct } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CakeMenuService {

  private productsUrl = "api/products";

  // products$ = this.http.get<IProduct[]>(this.productsUrl).pipe(
  //   //tap(data => console.log('ALL',JSON.stringify(data))),
  //   catchError(this.handleError),
  //   shareReplay(1)
  //  );

  //  private productInsertedSubject = new Subject<IProduct>();
  //  productInsertedAction$ = this.productInsertedSubject.asObservable();

  //  productsWithAdd$ = merge(
  //   this.products$,
  //   //this.productInsertedAction$
  //  )
  //  .pipe(
  //   tap(data => console.log('ALL',JSON.stringify(data))),
  //   scan((acc,value) => 
  //   (value instanceof Array) ? [...value] : [...acc, value] , [] as IProduct[])
  //  )

  constructor(private http:HttpClient) {
       }

  getProduct(id:number): Observable<IProduct> {
    if(id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
     return this.http.get<IProduct>(url).pipe(
      tap(data => console.log('Product Id :',id,"->",JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
     );
  }

  getProducts(): Observable<IProduct[]> {
    const url = `${this.productsUrl}`;
     return this.http.get<IProduct[]>(url).pipe(
      tap(data => console.log("Product Id : ->",JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe
                                 (
                                  delay(3000),
                                  scan((retryCount) => {
                                    if(retryCount >= 5){
                                      throw errors;
                                    }
                                    else {
                                      retryCount=retryCount + 1;
                                      console.log("Retry Count : ",retryCount);
                                      return retryCount;
                                    }
                                  },0)))
     );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    //this.productInsertedSubject.next(product);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    //this.productInsertedSubject.next(product);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }



  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productPrice: null,
      productType: null,
      productOccasion: null,
      productWeight: null,
      starRating: null,
      imageUrl: null
    };
  }

}
