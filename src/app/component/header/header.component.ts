import { Component, OnInit } from '@angular/core';
//import { MatMenu, MatMenuTrigger, MatButtonModule, MatCheckboxModule } from '@angular/material'; // npm install --save @angular/material @angular/cdk ※旧バージョンはMatではなくMd
import { Session }  from '../../model/models';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public login = false;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.sessionState.subscribe((session: Session)=> {
    	if(session) {
    		this.login = session.login;
    	}
    })
  }

  logout(): void { 
  	this.sessionService.logout();
  }

}
