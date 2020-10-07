import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {OffercreationComponent} from '../app/offercreation/offercreation.component'
import {OffersComponent} from '../app/offers/offers.component'

const routes: Routes = [
  { path: '', redirectTo: '/offers', pathMatch: 'full' },
  { path: 'new-offer', component: OffercreationComponent },
  { path: 'offers', component: OffersComponent },
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
