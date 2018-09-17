import * as moment from 'moment'; // npm install moment --save

/**
 * ログイン情報
 */
export class Login {
  email: string;
  password: string;
  password_confirmation: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
  }

  reset(): void {
    this.email = '';
    this.password = '';
    this.password_confirmation = '';    
  }
}

/**
 * ログイン認証後に生成されるセッション情報
 */
export class Session {
  login: boolean;
  email: string;

  constructor() {
    this.login = false;
  }

  reset(): Session {
    this.login = false;
    return this;
  }
}

/**
 * チャットコメント情報
 */
export class Comment {
  email: string;
  initial: string;
  content: string;
  date: number;
  key?: string;
  edit_flag?: boolean;

  constructor(email: string, content: string) {
    this.email = email;
    this.initial = email.slice(0, 1);
    this.content = content;
    this.date = +moment(); // +moment()は、現在時刻をUNIXタイムスタンプで取得するメソッド
  }

  // 取得した日付を反映し、更新フラグをつける
  setData(date: number, key: string): Comment {
    this.date = date;
    this.key = key
    this.edit_flag = false;
    return this;
  }
}
