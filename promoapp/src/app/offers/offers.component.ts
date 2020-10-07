import { Component, OnInit } from '@angular/core';
import {Offer} from '../../app/model/offer';
import {OffersService} from '../../app/services/offers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers$:Observable<Offer[]>

  constructor(private offerservices : OffersService){}

  ngOnInit(): void {
    this.offers$=this.offerservices.loadOffers()
  }

}
