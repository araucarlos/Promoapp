import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Offer} from '../app/model/offer';
import {OffersService} from '../app/services/offers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'promoapp';

  offers:Array<Offer>

  constructor(private offerservices : OffersService){}

  ngOnInit(): void {
    this.offerservices.loadOffers().subscribe(offers=>this.offers=offers)
  }

  onOfferSubmitted(offer:Offer){
    this.offerservices.PostRequest(offer);
    this.offers.push(offer)

  }
}
