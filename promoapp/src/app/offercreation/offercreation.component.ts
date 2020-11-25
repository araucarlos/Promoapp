import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Offercreationf } from '../offercreationf';
import { Offer } from '../model/offer';
import { Router} from '@angular/router';
import {OffersService} from '../../app/services/offers.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, tap } from "rxjs/operators";


@Component({
  selector: 'app-offercreation',
  templateUrl: './offercreation.component.html',
  styleUrls: ['./offercreation.component.scss']
})
export class OffercreationComponent implements OnInit {

  lvcsubscription$: Subscription
  modelgroups$:Observable<any[]>;
  localcodes$:Observable<any[]>;

  header:string = '';
  modelgroup:string = '';
  body:string = '';
  grade:string = '';
  ddiscount:number = 0;
  fdiscount:number = 0;
  oprice:number = 0;

  constructor(private offerservices : OffersService, private router: Router) { }

  offercf = new Offercreationf('', '', '', 0, 0);

  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  newOffer() {
    this.offercf = new Offercreationf('', '', '', 0, 0);
  }

  onSubmit() {
    const header: string = this.header;
    const type1: string = 'Desde';
    const type2: string = 'PVP';

    //string to date
    const find: number = this.monthNames.findIndex(month => month === this.offercf.date);
    const datein: Date = new Date();
    datein.setMonth(find);
    const date: Date = datein;

    if( this.modelgroup == 'D23B') {

      let ddiscount$ = this.offerservices.getddiscount(this.modelgroup, this.body, this.grade);
      let fdiscount$ = this.offerservices.getfdiscount(this.modelgroup);

      forkJoin([ddiscount$, fdiscount$]).subscribe(results => {
        this.ddiscount = parseFloat(results[0][0].discount);
        this.fdiscount = parseInt(results[1][0].discount);
        this.oprice = this.offercf.nrp * (1-this.ddiscount) - this.fdiscount;
        console.log(this.oprice)
      })

    }


    const price: number = this.offercf.nrp * (1-this.offercf.discount);
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
    this.lvcsubscription$ = this.offerservices.getByLvc(localcode)
      .pipe (
        map(data => data[0]),
      )
      .subscribe(data => {
        this.offercf.nrp = data.pff
        this.header = data.description
        this.modelgroup = data.model_group
        this.body = data.body
        this.grade = data.grade
      })
  }

  ngOnDestroy(): void {
    this.lvcsubscription$.unsubscribe()
  }


}
