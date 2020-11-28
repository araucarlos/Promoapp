import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Offercreationf } from '../offercreationf';
import { Offer } from '../model/offer';
import { Router} from '@angular/router';
import {OffersService} from '../../app/services/offers.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, tap, concatMap, switchMap } from "rxjs/operators";
import { CompileTemplateMetadata } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-offercreation',
  templateUrl: './offercreation.component.html',
  styleUrls: ['./offercreation.component.scss']
})
export class OffercreationComponent implements OnInit {

  subscription1$: Subscription;
  modelgroups$:Observable<any[]>;
  localcodes$:Observable<any[]>;

  header:string = '';
  price:number = 0;
  type1:string = '';
  type2:string = '';
  datein: Date = new Date();
  legal:string = '';
  emissions:string = '';
  finance:boolean = false;

  constructor(private offerservices : OffersService, private router: Router) { }

  offercf = new Offercreationf('', '', '', '', '', '');

  monthNames : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  newOffer() {
    this.offercf = new Offercreationf('', '', '', '', '', '');
  }

  onSubmit() {
    
    this.type1 = this.offercf.type

    const find: number = this.monthNames.findIndex(month => month === this.offercf.date);
    this.datein.setMonth(find);


    this.subscription1$  = this.offerservices.getByLvc(this.offercf.local_code)
      .pipe(
        map(data => data[0]),
        concatMap( data => forkJoin([
          this.offerservices.getddiscount(data.model_group, data.body, data.grade)
            .pipe(map(response => response[0].discount)),
          this.offerservices.getfdiscount(data.model_group)
            .pipe(map(response => response[0].discount))
        ])
        .pipe(
          switchMap(result => {
            if( data.model_group == 'D23B') {
              this.type2 = 'PFF';
              this.header = data.description;
              if( this.offercf.finance == 'Yes') {
                this.finance = true;
                this.price = data.pff*(1-result[0])-result[1];
              }
              else{
                this.price = data.pff*(1-result[0]);
              }
              this.legal = 'Price from ' + this.price + ' península y baleares';
              this.emissions = 'CO2';
            }
            const offer: Offer = { model_group: data.model_group, header: this.header, price: this.price, type1: this.type1, type2: this.type2, date: this.datein, legal: this.legal, emissions: this.emissions, finance: this.finance  };
            return this.offerservices.postOffer(offer)
          })
        )
        )
      )
      .subscribe(result => {
        this.router.navigate(['/offers'])  
      })

  }

  ngOnInit(): void {
    this.modelgroups$=this.offerservices.getModelGroups()
  }



  onMgSelect(modelgroup:string){
    this.localcodes$=this.offerservices.getLvcByMG(modelgroup)
  }

  ngOnDestroy(): void {
    
  }


}
