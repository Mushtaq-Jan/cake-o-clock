import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating:number | any;

   cropWidth: number = 75; 

  constructor() { }

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75/5;
      }

      onClick() {

      }

}
