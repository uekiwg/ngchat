import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subject }  from 'rxjs'; // 旧バージョンは'rxjs/Subject'

import { Session, Login }  from '../model/models';
import * as firebase from 'firebase/app';

/**
 * セッションサービス
 */
@Injectable()
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();
  user: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  /**
   * アカウントを作成する。
   * 参考：https://firebase.google.com/docs/auth/web/manage-users?hl=ja
   * @param login ログイン情報
   */
  signup(login: Login): void {
    this.afAuth
    .auth
    .createUserWithEmailAndPassword(login.email, login.password) // アカウント作成
    //.then( user => user.sendEmailVerification()) // メールアドレス確認
    .then(() => {
      alert('メールアドレス確認メールを送信しました。');
    })
    .catch( err => {
      console.log(err);
      alert('アカウントの作成に失敗しました。\n' + err)
    })
  }

  /**
   * ログインする。
   * firebase ＞ Authintication ＞ ユーザ へ登録されたメールアドレスとパスワードで認証される
   * @param login ログイン情報
   */
  login(login: Login): void {
    this.afAuth.auth.signInWithEmailAndPassword(login.email, login.password)
    .then(() => {
      return this.loggedIn(login.email);
    }).then(() => {
      //alert('ログインしました。');
      return this.router.navigate(['/chat']);
    })
    .catch( err => {
      console.log('ログインに失敗しました。', err);
      alert('ログインに失敗しました。\n' + err);
    })
  }

  /**
   * Googleアカウントでログインする。
   */
  loginGoogleAccount() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.loggedIn(res.email);
        return this.router.navigate(['/chat']);
      } else {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          return this.loggedIn(res.user.email);
        }).then(() => {
          return this.router.navigate(['/chat']);
        })
        .catch( err => {
          console.log('ログインに失敗しました。', err);
          alert('ログインに失敗しました。\n' + err);
        })
      }
    });
  }

  /**
   * ログアウトする。
   */
  logout(): void {
    this.afAuth.auth.signOut()
    .then(() => {
      this.sessionSubject.next(this.session.reset());
      return this.router.navigate(['']);
    }).then(() => {
      //alert('ログアウトしました。');
    })
    .catch( err => {
      console.log('ログアウトに失敗しました。', err);
      alert('ログアウトに失敗しました。\n' + err);
    })
  }

  loggedIn(email: string): Promise<boolean> {
    this.session.login = true;
    this.session.email = email;
    this.sessionSubject.next(this.session);
    return this.router.navigate(['/']);
  }
}
