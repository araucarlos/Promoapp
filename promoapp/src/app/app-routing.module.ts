import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {OffercreationComponent} from '../app/offercreation/offercreation.component'
import {OffersComponent} from '../app/offers/offers.component'
import {OffereditComponent} from '../app/offeredit/offeredit.component'
import {LoginComponent} from '../app/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'new-offer', component: OffercreationComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'edit-offer', component: OffereditComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
