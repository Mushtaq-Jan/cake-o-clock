import { IProduct } from "../product";
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from "rxjs";

export class CakeMenuData implements InMemoryDbService {

  createDb(): { products: IProduct[]} {
    const products: IProduct[] = [
        {
            "id": 1,
            "productName": "Black Forest",
            "productPrice": 100,
            "productType": "Cake",
            "productOccasion": "Birthday",
            "productWeight": "1Kg",
            "starRating": 4,
            "imageUrl": "assets/images/blackforest.jpg"
          },
          {
            "id": 2,
            "productName": "Red Velvet",
            "productPrice": 100,
            "productType": "pastry",
            "productOccasion": "Party",
            "productWeight": "200g",
            "starRating": 4.4,
            "imageUrl": "assets/images/redvelvet.jpg"
          },
          {
            "id": 3,
            "productName": "Choco Chips",
            "productPrice": 100,
            "productType": "Cookies",
            "productOccasion": "Convocation",
            "productWeight": "1Kg",
            "starRating": 5,
            "imageUrl": "assets/images/chococookies.jpg"
          },
          {
            "id": 4,
            "productName": "Choco Lava",
            "productPrice": 100,
            "productType": "Cake",
            "productOccasion": "Birthday",
            "productWeight": "1Kg",
            "starRating": 4,
            "imageUrl": "assets/images/chocolava.jpg"
          },
          {
            "id": 5,
            "productName": "Vannila Dip",
            "productPrice": 100,
            "productType": "Milk Shakes",
            "productOccasion": "Party",
            "productWeight": "400g",
            "starRating": 3.5,
            "imageUrl": "assets/images/vanilla.jpg"
          },
          {
            "id": 6,
            "productName": "Gulab Jamun",
            "productPrice": 300,
            "productType": "Sweet",
            "productOccasion": "Party",
            "productWeight": "100g",
            "starRating": 4.4,
            "imageUrl": "assets/images/jamun.jpg"
          }
    ];
    return {products};
  }
}