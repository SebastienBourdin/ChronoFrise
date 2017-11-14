var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
const express = require('express')
const app = express()

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "frise"
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/liste', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    con.connect();
    var frises=[];
    con.query("SELECT * FROM frise", function (err, result) {
    if (err)
        throw err;
    frises=result;
    res.render('liste', {frises});
    con.end();
    });    
});


app.get('/frise/:id', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    con.connect();
    var elements=[];
    con.query("SELECT * FROM element where id_frise='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    elements=result;
    res.render('frise',{elements});   
    con.end();
    });    
});



app.listen(8080, function () {
    console.log('listening on port 8080!')
})
