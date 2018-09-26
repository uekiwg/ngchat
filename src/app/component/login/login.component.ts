import { Component, OnInit } from '@angular/core';
import { Login }  from '../../model/models';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login = new Login();

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.login);
  }

  loginGoogleAccount(e: Event) {
    //e.preventDefault();
    this.sessionService.loginGoogleAccount();
  }
}
