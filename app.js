var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    var frises=[];
    con.query("SELECT * FROM frise", function (err, result) {
    if (err)
        throw err;
    frises=result;
    res.render('liste', {frises});
    });    
});


app.get('/frise/:id', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    var elements=[];
    con.query("SELECT * FROM element where id_frise='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    elements=result;
    res.render('frise',{elements});   
    });    
});

app.post('/frise/:id', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    console.log(req.body.data);
    
    //suppression des anciens éléments
    con.query("DELETE form element where id_frise='"+req.params.id+"'",function (err, result) {
    if (err)
        throw err;
    });
    var elements=[req.body.data];
    //ajout des nouveaux éléments
    elements.forEach(function(elem){
       con.query("INSERT into element set id_frise='"+req.params.id+"',titre='"+elem.id+"', datedebut='"+elem.start+"', datefin='"+elem.end+"', classname='"+elem.className+"' ",function (err, result) {
        if (err)
            throw err;
        }); 
    });
    
   //préparation de l'affichage de la frise mise a jour
    var elements=[];
    con.query("SELECT * FROM element where id_frise='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    elements=result;
    res.render('frise',{elements});   
    });    
});



app.listen(8080, function () {
    console.log('listening on port 8080!')
})
