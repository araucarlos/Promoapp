import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../model/offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private REST_API_SERVER = "http://localhost:3000/offers";

  constructor(private httpClient: HttpClient) {}

  public PostRequest(offer:Offer){
    return this.httpClient.post<Offer>(this.REST_API_SERVER, offer)
  }

  public loadOffers():Observable<Offer[]>{
    return this.httpClient.get<Offer[]>(this.REST_API_SERVER)
  }

}
