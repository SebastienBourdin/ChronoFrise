var http = require('http');
var url = require('url');
var fs = require('fs');
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

            con.connect(function (err) {
                if (err)
                    throw err;
                console.log("Connected!");
                con.query("SELECT titre FROM frise", function (err, result) {
                    if (err)
                        throw err;
                    console.log("Result: " + result);
                });
            });

            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("<html><head><title>Liste des frises disponibles</title>"
                    + "<meta charset='UTF-8'>"
                    + "<script src='http://code.jquery.com/jquery-1.12.4.min.js'></script>"
                    + "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>"
                    + "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css'>"
                    + "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>"
                    + "<link rel='stylesheet' href='style.css' />"
                    + "</head>"

                    + "<h1>Liste des frises disponnibles</h1>"

            +"<table class='table'>"
                +"<thead>"
                    +"<tr><th>Nom de la frise</th><th>Action</th></tr>"
                +"</thead>"
                +"<tbody>"
               
                +"</tbody>"
            +"</table>"

                    + "</html>");
        } else if (page == '/frise') {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(frise);
        }
        res.end();
    });
    server.listen(8080);

});