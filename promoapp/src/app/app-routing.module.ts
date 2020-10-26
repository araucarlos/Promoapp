import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {OffercreationComponent} from '../app/offercreation/offercreation.component'
import {OffersComponent} from '../app/offers/offers.component'
import {OffereditComponent} from '../app/offeredit/offeredit.component'

const routes: Routes = [
  { path: '', redirectTo: '/offers', pathMatch: 'full' },
  { path: 'new-offer', component: OffercreationComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'edit-offer', component: OffereditComponent },
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
