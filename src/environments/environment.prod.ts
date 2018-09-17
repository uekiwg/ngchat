// Firebaseへデプロイ時に利用される実行環境用定義
// Firebaseへのデプロイ手順
//   cd myApp         ※ プロジェクトフォルダへ移動
//   ng build --prod  ※ distフォルダへビルドファイルが生成される
//   firebase login   ※ Firebaseへログイン
//   firebase deploy  ※ Firebaseへデプロイされる
export const environment = {
  production: true,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
