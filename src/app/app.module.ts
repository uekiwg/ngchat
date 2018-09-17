import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // npm install --save @angular/animations
//import { MatMenu, MatMenuTrigger, MatButtonModule, MatCheckboxModule } from '@angular/material'; // npm install --save @angular/material @angular/cdk ※旧バージョンはMatではなくMd
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2'; // npm install firebase angularfire2 --save
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // npm install jquery popper.js @ng-bootstrap/ng-bootstrap --save

import { environment } from '../environments/environment';

import { DateYmdHm } from './pipe/date-ymdhm.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { ChatComponent } from './component/chat/chat.component';
import { PageNotFoundComponent } from './component/error/page-not-found/page-not-found.component';
import { SessionService } from './service/session.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'chat', component: ChatComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ChatComponent,
    PageNotFoundComponent,
    DateYmdHm
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
