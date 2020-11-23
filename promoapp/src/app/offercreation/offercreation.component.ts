import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Offercreationf } from '../offercreationf';
import { Offer } from '../model/offer';
import { Router} from '@angular/router';
import {OffersService} from '../../app/services/offers.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-offercreation',
  templateUrl: './offercreation.component.html',
  styleUrls: ['./offercreation.component.scss']
})
export class OffercreationComponent implements OnInit {

  modelgroups$:Observable<any[]>;
  localcodes$:Observable<any[]>;

  constructor(private offerservices : OffersService, private router: Router) { }

  offercf = new Offercreationf('', '', '', 0, 0);

  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  newOffer() {
    this.offercf = new Offercreationf('', '', '', 0, 0);
  }

  onSubmit() {

    
    const header: string = 'hello';
    const price: number = this.offercf.nrp * (1-this.offercf.discount);
    const type1: string = 'Desde';
    const type2: string = 'PVP';

    //string to date
    const find: number = this.monthNames.findIndex(month => month === this.offercf.date);
    const datein: Date = new Date();
    datein.setMonth(find);
    const date: Date = datein;
  
    const legal: string = 'Price from ' + price + ' península y baleares';
    const emissions: string = 'CO2';

    const offer:Offer = {header, price, type1, type2, date, legal, emissions};

    this.offerservices.postOffer(offer).subscribe(()=>{this.router.navigate(['/offers'])})

  }

  ngOnInit(): void {
    this.modelgroups$=this.offerservices.getModelGroups()
  }


  onMgSelect(modelgroup:string){
    this.localcodes$=this.offerservices.getLvcByMG(modelgroup)
  }

  onLvcSelect(localcode:string){
    this.offerservices.getNrpByLvc(localcode)
      .subscribe(
        price => {
          this.offercf.nrp = price[0].pff

        }
      )
  }

}
