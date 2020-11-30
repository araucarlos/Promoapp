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
                this.price = Number((data.pff*(1-result[0])-result[1]).toFixed(2));
              }
              else{
                this.price = Number((data.pff*(1-result[0])).toFixed(2));
              }

              this.legal = '*Precio Franco Fábrica para Nissan NAVARA ' + this.header + ' para Península y Baleares ' + this.price + '€ 5 años de garantía o 160.000 km (IVA, transporte y Nissan assistance no incluidos. Campaña promocional incluida) Oferta válida para ventas a autónomos y empresas que financien con  RCI Banque SA, Sucursal en España. Importe mínimo a financiar 7.000€. Permanencia mínima 36 meses. Oferta no compatible con otras campañas y válida hasta el 31/' + this.numbermonth(this.datein.getMonth()+1) + '/2020. Para más información acude a tu concesionario Nissan más cercano. La imagen visualizada puede no coincidir con el vehículo ofertado. Para más información acude a tu concesionario Nissan más cercano. 5 años de garantía o 160.000 km, lo que antes suceda. Consumo homologado de acuerdo con la normativa europea.  El consumo de combustible y las emisiones de CO2 no sólo dependen del rendimiento del vehículo; influyen también el comportamiento al volante y otros factores no técnicos'

              this.emissions = 'Consumo mixto WLTP: 8,9 l/100 km. Emisiones de CO2 WLTP: 234 g/km. Consumo y emisiones homologados de conformidad con la normativa europea aplicable. Como consecuencia de la introducción del nuevo procedimiento de prueba armonizado a nivel mundial para vehículos ligeros (WLTP)  los datos técnicos mostrados podrían ser actualizados antes de la matriculación del vehículo e influir en los tipos impositivos que resulten de aplicación. El equipamiento opcional y accesorios junto con otros factores no técnicos pueden afectar el consumo y las emisiones. Las motorizaciones mostradas pueden estar sujetas a restricciones de disponibilidad debido a cambios en la gama de motorizaciones Nissan. Consulta disponibilidad y fecha de entrega con tu Concesionario Nissan. Para más información sobre los valores oficiales de consumo y autonomía consulta https://www.nissan.es/wltp.html.';
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

  numbermonth(number): void {
    const numberStr = number.toString();
    if(numberStr.length < 2){
      number = '0' + number;
    }   
    return number
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
