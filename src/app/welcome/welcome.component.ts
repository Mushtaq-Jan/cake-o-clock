import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
 })
export class WelcomeComponent implements OnInit {

  title= "Cake O'Clock";

  constructor() { }

  ngOnInit(): void {
  }

}
