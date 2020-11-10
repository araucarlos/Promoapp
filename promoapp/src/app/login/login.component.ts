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

  constructor( private authservice : AuthenticationService, private router: Router, private cookieService: CookieService ) { }

  loginf = new Loginf('', '');

  ngOnInit(): void {
  }

  Login(){
    const credentials:any = {
      username:this.loginf.username, 
      password:this.loginf.password
    };
    this.authservice.login(credentials).subscribe(response => {
      const token = JSON.parse(JSON.stringify(response)).token
      this.cookieService.set('authToken', token);
      this.router.navigate(['/offers'])
    })
  }

}
