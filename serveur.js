var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');

fs.readFile('./frise.html', function (err, frise) {
    if (err) {
        throw err;
    }
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "frise"
    });


    var server = http.createServer(function (req, res) {
        var page = url.parse(req.url).pathname;
        console.log(page);
        if (page == '/') {
            res.writeHead(301, {Location: '/liste'});


        } else if (page == '/liste') {
            var html_response;
            con.connect(function (err) {
                if (err)
                    throw err;
                console.log("Connected!");
                con.query("SELECT titre FROM frise", function (err, result) {
                    if (err)
                        throw err;
                    console.log("Result: " + result);
                    html_response = ejs.render({url: './view/liste.ejs'},{result:result});
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(html_response);
                });
            });
        } else if (page == '/frise') {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(frise);
        }
        res.end();
    });
    server.listen(8080);

});