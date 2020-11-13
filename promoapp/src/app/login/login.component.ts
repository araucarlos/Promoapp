import { Component, OnInit } from '@angular/core';
import { Loginf } from '../loginf';
import { AuthenticationService } from '../../app/services/authentication.service';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  wrongcredentials = false;

  constructor( private authservice : AuthenticationService, private router: Router, private cookieService: CookieService ) { }

  loginf = new Loginf('', '');

  ngOnInit(): void {
  }

  Login(){
    const credentials:any = {
      email:this.loginf.email, 
      password:this.loginf.password
    };
    this.authservice.login(credentials).subscribe(response => {
      if (JSON.parse(JSON.stringify(response)).message == "Incorrect User or Password"){
        this.wrongcredentials = true
      } else{
        const token = JSON.parse(JSON.stringify(response)).token;
        this.authservice.isLoggedIn$.next(true);
        this.cookieService.set('authToken', token);
        this.router.navigate(['/offers'])
      } 
    })
  }
}
