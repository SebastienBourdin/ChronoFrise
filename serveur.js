var http = require('http');
var url = require('url');
var fs = require('fs');

fs.readFile('./frise.html', function (err, frise) {
    if (err) {
        throw err;
    }
    var con = mysql.createConnection({
        host: "localhost",
        user: "yourusername",
        password: "yourpassword"
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
                con.query("SELECT titre FROM 'frise'", function (err, result) {
                    if (err)
                        throw err;
                    console.log("Result: " + result);
                });
            });

            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("<html><head>"


                    + "</head>"

                    + "</html>");
        } else if (page == '/frise') {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(frise);
        }
        res.end();
    });
    server.listen(8080);

});