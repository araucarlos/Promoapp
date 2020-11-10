import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service'
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private authservice : AuthenticationService, private cookieService: CookieService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: this.cookieService.get('authToken')
      }
    });
    
    return next.handle(request);
  }
}
