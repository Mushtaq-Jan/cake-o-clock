import { IProduct } from '../product';
import { CategoryPipe } from './category.pipe';

describe('CategoryPipe', () => {
  let products: IProduct[] = [{
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
  "id": 4,
  "productName": "Choco Lava",
  "productPrice": 100,
  "productType": "Cake",
  "productOccasion": "Birthday",
  "productWeight": "1Kg",
  "starRating": 4,
  "imageUrl": "assets/images/chocolava.jpg"
},  
  ];
  it('checking the Products with repeating categories are being removed', () => {
    let pipe = new CategoryPipe();
    
    expect(pipe.transform(products)?.length).toBe(1);
  });
});
