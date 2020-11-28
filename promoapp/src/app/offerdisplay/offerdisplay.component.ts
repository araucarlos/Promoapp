import { Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Offer } from '../model/offer';
import {OffersService} from '../services/offers.service';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-offerdisplay',
  templateUrl: './offerdisplay.component.html',
  styleUrls: ['./offerdisplay.component.scss'],
})
export class OfferdisplayComponent implements OnInit {

  display:Boolean = true;

  model:string = '';

  @Input()
  offer:Offer
  
  constructor(private offerservices : OffersService, private router: Router) { }

  ngOnInit(): void {
    if (this.offer.model_group == 'D23B'){
      this.model = 'Navara'
    }
    else{
      this.model = 'X-Trail'
    }
  }

  edit(){
    this.offerservices.id.next(this.offer.id)
    
  }

  delete(){
    this.offerservices.deleteOffer(this.offer.id).subscribe(()=>this.display=false)
  }

}
