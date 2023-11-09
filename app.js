const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8000;

/*
|WEBサーバーとWEBブラウザの間はMIMEタイプを用いてデータの形式を指定する必要がある
|　→サーバーがcssや画像のMIMEタイプを読みとれるように設定がする必要がある
|Expressなどのフレームワークを使えばデフォルトで読み込めるよ
*/
function getType(_url) {
    //MIMEタイプを設定 
    var types = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    }
    for (var key in types) {
      if (_url.endsWith(key)) {
        return types[key];
      }
    }
    return 'text/plain';
  }


//Webサーバーを作る
const server = http.createServer((req,res) => {
    //
    console.log(req.url)
    if(req.url == '/'){
        console.log('YES');
    }
    var url = 'app' + (req.url.endsWith('/') ? req.url + 'index.html' : req.url);
    console.log(url)
    
    //ブラウザからアクセス来た時の処理
    if (fs.existsSync(url)) {
        fs.readFile(url, (err, data) => {
          if (!err) {
            res.writeHead(200, {'Content-Type': getType(url)});
            res.end(data);
          } else {
            res.statusCode = 500;
            res.end();
          }
        });
      } else {
        res.statusCode = 404;
        res.end();
      }

});

server.listen(PORT,() => {
    console.log('server running!');
    //__dirnameは現在のディレクトリのパスを示す特別な変数（C:\Users\ryomi\git-practice-01）まで
    console.log(__dirname);
    //__filenameは現在のモジュールの絶対パスを示す特別な変数（C:\Users\ryomi\git-practice-01\app.js）まで
    console.log(__filename);
});
