import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from 'src/app/product';
import { CakeMenuService } from '../cake-menu.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css']
})
export class CakeDetailsComponent implements OnInit {

product!: IProduct;
id!: number;
errorMessage = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cakeService: CakeMenuService) { }

  ngOnInit() {
    const param = Number(this.route.snapshot.paramMap.get('id'));
    
    if (param) {
      const id = +param;
      this.getProduct(id);
      console.log(JSON.stringify(this.product));
    }
  }

  getProduct(id: number): void {
    this.cakeService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
   this.router.navigate(['cakes']);
  }

}
