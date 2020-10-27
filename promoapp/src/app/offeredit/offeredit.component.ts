import { Component, OnInit } from '@angular/core';
import { Offereditf } from '../offereditf';
import {OffersService} from '../services/offers.service';

@Component({
  selector: 'app-offeredit',
  templateUrl: './offeredit.component.html',
  styleUrls: ['./offeredit.component.scss']
})
export class OffereditComponent implements OnInit {

  constructor( private offerservices : OffersService ) { }

  offeref = new Offereditf('', '', '', '', '');

  onSubmit() {
    console.log('form submitted')
  }

  ngOnInit(): void {
    this.offerservices.mg.subscribe(mg => {
      console.log("model group:" + mg)
    })
  }

  ngOnDestroy(): void {

  }

}
