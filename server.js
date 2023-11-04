const http = require("http");
const PORT = 8000;
const html = require("fs").readFileSync("./index.html")

//Webサーバーを作る
const server = http.createServer((req,res) => {
    //ブラウザからアクセス来た時の処理
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
 
    //リクエストがGETだった場合
    if(req.method == "GET"){
        res.write("<h1>GETでアクセスしました</h1>");
        //Feature-01で行追加
        res.write("<h2>Feature-01追加分の行です</h2>");

        //Feature-02で行追加
        res.write("</br><h2>Feature-02追加分の行です</h2>");
    }

    //リクエストがPOSTだった場合
    if(req.method == "POST"){
        res.write("<h1>POSTでアクセスしました</h1>");
    }
    res.end();

    console.log("TEST用出力");

});

server.listen(PORT,() => {
    console.log("server running!");
});