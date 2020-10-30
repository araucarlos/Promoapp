import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Offer } from '../model/offer';
import { Offereditf } from '../offereditf';
import {OffersService} from '../services/offers.service';

@Component({
  selector: 'app-offeredit',
  templateUrl: './offeredit.component.html',
  styleUrls: ['./offeredit.component.scss']
})
export class OffereditComponent implements OnInit {

  idsubscription:any;
  offer:Offer
  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  constructor( private offerservices : OffersService ) {

  }

  offeref = new Offereditf('', '', '', '', '');

  onSubmit() {
    console.log('form submitted')
  }

  ngOnInit(): void {
    this.idsubscription = this.offerservices.id.subscribe(id => {
      this.offerservices.loadOfferId(id).subscribe(offer => {
        this.offeref.date = this.monthNames[parseInt(offer[0].date.substring(5,7))-1];
        this.offeref.model_group = offer[0].model_group;
        this.offeref.local_code = offer[0].local_code;
        this.offeref.header = offer[0].header;
        this.offeref.legal = offer[0].legal;
      });
    });
  }
  

  ngOnDestroy(): void {
    this.idsubscription.unsubscribe()
  }

}
