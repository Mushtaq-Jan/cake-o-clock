import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CakeMenuData } from './cake-menu/cake-menu-data';
import { IProduct } from './product';


export class AppData implements InMemoryDbService {

  createDb(): { products: IProduct[] } {
    const products = CakeMenuData.products;
    return { products};
  }
}
