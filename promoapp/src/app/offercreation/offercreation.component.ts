import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Offercreationf } from '../offercreationf';
import { Offer } from '../model/offer';

@Component({
  selector: 'app-offercreation',
  templateUrl: './offercreation.component.html',
  styleUrls: ['./offercreation.component.scss']
})
export class OffercreationComponent implements OnInit {

  constructor() { }

  offercf = new Offercreationf(new Date(), '', '', 0, 0);

  submitted = false;

  newOffer() {
    this.offercf = new Offercreationf(new Date(), '', '', 0, 0);
  }

  onSubmit() {
    //Calculations to get Offer and emit it
    this.submitted = true;

  }


  ngOnInit(): void {
  }


}
