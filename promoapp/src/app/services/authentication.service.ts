import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../model/offer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private REST_API_SERVER = "http://localhost:3000/";

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor( private httpClient: HttpClient ) {}

  public login(credentials:any){
    return this.httpClient.post(this.REST_API_SERVER + "login", credentials)
  }

}

