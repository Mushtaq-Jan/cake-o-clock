import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CakeMenuComponent } from './cake-menu/cake-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StarComponent } from './shared/star/star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CakeDetailsComponent } from './cake-menu/cake-details/cake-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CakeMenuData } from './cake-menu/cake-menu-data';
import { CategoryPipe } from './cake-menu/category.pipe';
import { CakeEditComponent } from './cake-menu/cake-edit/cake-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    CakeMenuComponent,
    NavbarComponent,
    StarComponent,
    CakeDetailsComponent,
    WelcomeComponent,
    CategoryPipe,
    CakeEditComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(CakeMenuData),
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
