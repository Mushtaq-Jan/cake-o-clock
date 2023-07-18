import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { IProduct } from '../product';

@Pipe({
  name: 'uniqueCategory',
  pure: false
})
export class CategoryPipe implements PipeTransform {

  transform(value: IProduct[] | null): IProduct[] | null{
      if(value!== undefined && value!== null){
          return _.uniqBy(value, 'productType');
      }
      return value;
  }

}
