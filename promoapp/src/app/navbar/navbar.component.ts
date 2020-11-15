import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authservice : AuthenticationService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.cookieService.delete('authToken');
    this.authservice.isLoggedIn$.next(false)
  }

}
