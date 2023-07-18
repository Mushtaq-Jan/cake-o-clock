import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/product';
import { NumberValidators } from 'src/app/shared/number.validator';
import { CakeMenuService } from '../cake-menu.service';

@Component({
  selector: 'app-cake-edit',
  templateUrl: './cake-edit.component.html',
  styleUrls: ['./cake-edit.component.css']
})
export class CakeEditComponent implements OnInit {
 
  pageTitle = 'Add Product';
  errorMessage!: string;
  productForm!: FormGroup;

  product!: IProduct;
  private sub!: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cakeService: CakeMenuService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
     productName: ['',Validators.required],
     imageUrl: ['',Validators.required],
     productPrice: ['',Validators.required],
     productType: ['',Validators.required],
     productOccasion: ['',Validators.required],
     productWeight: ['',Validators.required],
     starRating: ['',NumberValidators.range(1,5)]
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        this.getProduct(id);
      }
    );
  }

  getProduct(id: number): void {
    this.cakeService.getProduct(id)
      .subscribe({
        next: (product: IProduct) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      imageUrl: this.product.imageUrl,
     productPrice: this.product.productPrice,
     productType: this.product.productType,
     productOccasion: this.product.productOccasion,
     productWeight: this.product.productWeight,
      starRating: this.product.starRating
    });
   }

   get name() { return this.productForm.get('productName'); }
   get imagePath() { return this.productForm.get('imageUrl'); }
   get price() { return this.productForm.get('productPrice'); }
   get type() { return this.productForm.get('productType'); }
   get occasion() { return this.productForm.get('productOccasion'); }
   get weight() { return this.productForm.get('productWeight'); }
   get rating() { return this.productForm.get('starRating'); }

   saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };
     
        if (p.id === 0) {
          this.cakeService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err,
              complete: () => console.log("Added Product")
            });
        } else {
          this.cakeService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err,
              complete: () => console.log("Updated Product")
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
    console.log("Save Product Called")
  }

   onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/cakes']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
