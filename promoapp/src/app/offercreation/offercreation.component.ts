import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Offercreationf } from '../offercreationf';
import { Offer } from '../model/offer';
import { Router} from '@angular/router';
import {OffersService} from '../../app/services/offers.service';

@Component({
  selector: 'app-offercreation',
  templateUrl: './offercreation.component.html',
  styleUrls: ['./offercreation.component.scss']
})
export class OffercreationComponent implements OnInit {

  constructor(private offerservices : OffersService, private router: Router) { }

  offercf = new Offercreationf(new Date(), '', '', 0, 0);

  submitted = false;

  newOffer() {
    this.offercf = new Offercreationf(new Date(), '', '', 0, 0);
  }

  onSubmit() {
    //Calculations to get Offer and emit it
    this.submitted = true;
    
    const date: Date = this.offercf.date
    const model_group: string = this.offercf.model_group;
    const local_code: string = this.offercf.local_code
    const nrp_d: number = this.offercf.nrp * (1-this.offercf.discount)
    const header: string = 'Price from ' + nrp_d
    const legal: string = 'Price from ' + nrp_d + ' península y baleares'

    const offer:Offer = {date, model_group, local_code, header, legal}

    this.onOfferSubmitted(offer)

  }

  ngOnInit(): void {
  }

  onOfferSubmitted(offer:Offer){
    this.offerservices.PostRequest(offer).subscribe(()=>{this.router.navigate(['/offers'])})
  }


}
