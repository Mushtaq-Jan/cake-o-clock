import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeDetailsComponent } from './cake-menu/cake-details/cake-details.component';
import { CakeEditComponent } from './cake-menu/cake-edit/cake-edit.component';
import { CakeMenuComponent } from './cake-menu/cake-menu.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'cakes',component: CakeMenuComponent
  },
  {
    path: 'cakes/:id', component: CakeDetailsComponent
  },
  {
    path: 'cakes/:id/edit', component: CakeEditComponent
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'cakes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
