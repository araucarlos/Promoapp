import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OffercreationComponent } from './offercreation/offercreation.component';
import { HttpClientModule } from '@angular/common/http';
import { OfferdisplayComponent } from './offerdisplay/offerdisplay.component';
import { AppRoutingModule } from './app-routing.module';
import { OffersComponent } from './offers/offers.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {OffereditComponent} from '../app/offeredit/offeredit.component';

@NgModule({
  declarations: [
    AppComponent,
    OffercreationComponent,
    OfferdisplayComponent,
    OffersComponent,
    OffereditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
