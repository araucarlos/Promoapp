import { Component } from '@angular/core';
import {Offer} from '../app/model/offer';
import {OffersService} from '../app/services/offers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'promoapp';

  constructor(private offerservices : OffersService){}

  onOfferSubmitted(offer:Offer){
    this.offerservices.PostRequest(offer)
  }
}
