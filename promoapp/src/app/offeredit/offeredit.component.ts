import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Offereditf } from '../offereditf';
import {OffersService} from '../services/offers.service';

@Component({
  selector: 'app-offeredit',
  templateUrl: './offeredit.component.html',
  styleUrls: ['./offeredit.component.scss']
})
export class OffereditComponent implements OnInit {

  mgsubscription:any;

  constructor( private offerservices : OffersService ) {

  }

  offeref = new Offereditf('', '', '', '', '');

  onSubmit() {
    console.log('form submitted')
  }

  ngOnInit(): void {
    this.mgsubscription = this.offerservices.mg.subscribe(mg => {
      console.log(mg);
    })
  }
  

  ngOnDestroy(): void {
    console.log("hello");
    this.mgsubscription.unsubscribe()
  }

}
