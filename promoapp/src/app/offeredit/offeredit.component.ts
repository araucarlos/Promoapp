import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Offer } from '../model/offer';
import { Offereditf } from '../offereditf';
import {OffersService} from '../services/offers.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-offeredit',
  templateUrl: './offeredit.component.html',
  styleUrls: ['./offeredit.component.scss']
})
export class OffereditComponent implements OnInit {

  idsubscription$: Subscription
  offer:Offer
  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  constructor( private offerservices : OffersService, private router: Router ) {

  }

  offeref = new Offereditf(0,'','', 0, '', '', '','','', false);

  onSubmit() {
    const id:number = this.offeref.id;
    const model_group: string = this.offeref.model_group;
    const header: string = this.offeref.header;
    const price: number = this.offeref.price;
    const type1: string = this.offeref.type1;
    const type2: string = this.offeref.type2;

    //string to date
    const find: number = this.monthNames.findIndex(month => month === this.offeref.date);
    const datein: Date = new Date();
    datein.setMonth(find);
    const date: Date = datein;

    const legal: string = this.offeref.legal;
    const emissions: string = this.offeref.emissions;

    const finance:boolean = this.offeref.finance;

    const offer:Offer = {id, model_group, header, price, type1, type2, date, legal, emissions, finance};

    this.offerservices.updateOffer(offer).subscribe(()=>{this.router.navigate(['/offers'])})

  }

  ngOnInit(): void {
    this.idsubscription$ = this.offerservices.id.subscribe(id => {
      this.offerservices.loadOfferId(id).subscribe(offer => {
        this.offeref.id = offer[0].id;
        this.offeref.model_group = offer[0].model_group;
        this.offeref.header = offer[0].header;
        this.offeref.price = offer[0].price;
        this.offeref.type1 = offer[0].type1;
        this.offeref.type2 = offer[0].type2;
        this.offeref.date = this.monthNames[parseInt(offer[0].date.substring(5,7))-1];
        this.offeref.legal = offer[0].legal;
        this.offeref.emissions = offer[0].emissions;
        this.offeref.finance = offer[0].finance;
      });
    });
  }
  

  ngOnDestroy(): void {
    this.idsubscription$.unsubscribe()
  }

}
