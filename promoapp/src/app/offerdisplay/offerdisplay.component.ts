import { Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Offer } from '../model/offer';
import {OffersService} from '../services/offers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offerdisplay',
  templateUrl: './offerdisplay.component.html',
  styleUrls: ['./offerdisplay.component.scss'],
})
export class OfferdisplayComponent implements OnInit {

  @Input()
  offer:Offer
  
  
  constructor() { }

  ngOnInit(): void {

  }

}
