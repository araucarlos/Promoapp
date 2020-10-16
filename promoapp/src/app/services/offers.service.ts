import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../model/offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private REST_API_SERVER = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) {}

  public PostRequest(offer:Offer){
    return this.httpClient.post<Offer>(this.REST_API_SERVER + "offers", offer)
  }

  public loadOffers():Observable<Offer[]>{
    return this.httpClient.get<Offer[]>(this.REST_API_SERVER + "offers")
  }

  public getModelGroups():Observable<any[]>{
    return this.httpClient.get<any[]>(this.REST_API_SERVER + "modelgroup")
  }

  public getLvcByMG(modelgroup:string):Observable<any[]>{
    return this.httpClient.get<any[]>(this.REST_API_SERVER + modelgroup)
  }

}
