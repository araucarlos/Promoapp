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

  idsubscription:any;
  offer:Offer
  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  constructor( private offerservices : OffersService, private router: Router ) {

  }

  offeref = new Offereditf(0,'', '', '', '', '');

  onSubmit() {
    const id:number = this.offeref.id;

    //string to date
    const find: number = this.monthNames.findIndex(month => month === this.offeref.date);
    const datein: Date = new Date();
    datein.setMonth(find);
    const date: Date = datein;

    const model_group: string = this.offeref.model_group;
    const local_code: string = this.offeref.local_code;
    const header: string = this.offeref.header;
    const legal: string = this.offeref.legal;

    const offer:Offer = {id, date, model_group, local_code, header, legal};

    this.offerservices.updateOffer(offer).subscribe(()=>{this.router.navigate(['/offers'])})

  }

  ngOnInit(): void {
    this.idsubscription = this.offerservices.id.subscribe(id => {
      this.offerservices.loadOfferId(id).subscribe(offer => {
        this.offeref.id = offer[0].id;
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
