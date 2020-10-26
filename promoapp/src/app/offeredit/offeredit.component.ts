import { Component, OnInit } from '@angular/core';
import { Offereditf } from '../offereditf';

@Component({
  selector: 'app-offeredit',
  templateUrl: './offeredit.component.html',
  styleUrls: ['./offeredit.component.scss']
})
export class OffereditComponent implements OnInit {

  constructor() { }

  offeref = new Offereditf('', '', '', '', '');

  onSubmit() {
    console.log('form submitted')
  }


  ngOnInit(): void {
  }

}
