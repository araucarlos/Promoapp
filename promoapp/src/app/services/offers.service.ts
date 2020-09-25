import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private REST_API_SERVER = "http://localhost:3000/offers";

  constructor(private httpClient: HttpClient) {}

  public PostRequest(offer:Offer){
    this.httpClient.post<Offer>(this.REST_API_SERVER, offer).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
