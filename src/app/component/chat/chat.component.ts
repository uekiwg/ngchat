import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Comment } from '../../model/models';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

/**
 * チャットコンポーネント
 */
export class ChatComponent implements OnInit {

  /**
   * firebase Database のcomment
   */
  public FB_comments: AngularFireList<{}>;
  /**
   * FB_comments を 画面表示用に変換
   */
  public comments: Comment[] = [];
  /**
   * ログイン認証で入力されたメールアドレス
   */
  public currentUserEmail: string;
  /**
   * 入力されるコメント
   */
  public content = '';

  private elements : HTMLElement;

  /**
   * コンストラクタ。
   * @param db firebase Database
   * @param router ルーター
   * @param sessionService セッションサービス
   */
  constructor(private db: AngularFireDatabase, private router: Router
    ,private sessionService: SessionService, private elementRef: ElementRef) {
      this.elements = elementRef.nativeElement;
  }

  /**
   * 初期化処理を行う。
   */
  ngOnInit() {
    // ログイン認証済みか判定
    if (!this.sessionService.session.login) {
      console.log("sessionService.session.login=" + this.sessionService.session.login);
      // ログイン認証されていないので、ログイン画面へリダイレクト
      this.router.navigate(['/']);
    }
    // ログイン認証で入力されたメールアドレスを保持
    this.currentUserEmail = this.sessionService.session.email;
    console.log("currentUserEmail=" + this.currentUserEmail);

    // firebase Database のcomment を 画面表示用に変換
    this.FB_comments = this.db.list('comments', ref => 
      ref.limitToLast(10)
    );
    this.FB_comments.snapshotChanges().subscribe((actions: any[]) => {
      this.comments = [];
      actions.forEach((action: any) => {
        const val = action.payload.val();
        const key = action.payload.key;
        this.comments.push(new Comment(val.email, val.content).setData(val.date, key));
      });
      setTimeout(() => {this.scrollBottom();}, 1000);
    });
  }

  /**
   * 新しいコメントを追加する。
   * @param comment コメント情報
   */
  addComment(comment: string) {
     if (comment) {
       this.FB_comments.push(new Comment(this.currentUserEmail, comment));
       this.content = '';
       this.scrollBottom();
     }
  }

  /**
   * 編集フィールドを切り替える。
   * @param num コメント情報の添字
   */
  toggleEditComment(num: number) {
    this.comments[num].edit_flag = (this.comments[num].edit_flag) ? false : true;
  }

  /**
   * コメントを更新する。
   * @param num コメント情報の添字
   * @param key DB上のキー
   */
  saveEditComment(num: number, key: string) {
    this.FB_comments.update(key, {
      content: this.comments[num].content, 
      date: this.comments[num].date
    }).then( () => {
      //alert('コメントを更新しました');
      this.comments[num].edit_flag = false;
    });
  }

  /**
   * コメントをリセットする。
   */
  resetEditComment(num: number) {
    this.comments[num].content = '';
  }

  /**
   * コメントを削除する。
   * @param key DB上のキー
   */
  deleteComment(key: string) {
    this.FB_comments.remove(key).then(() => {
      //alert('コメントを削除しました');
    });
  }

  /**
   * チャットボードを最下部へスクロールする。
   */
  scrollBottom(): void {
    let comments_bottom = this.elements.querySelector("#comments_bottom") as HTMLAnchorElement;
    comments_bottom.focus();
  }
}
