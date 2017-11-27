var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const util = require('util');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var con = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password : '',
    database: 'frise'
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
     app.use(express.static(__dirname+'/ressources'));
      res.render('connexion');
});

// Affichage de la liste des Frises disponibles dans la base de données
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

// Affichage du formulaire d'ajout de frise
app.get('/add', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
            
    res.render('add_frise');   
 });    


// Fonction d'ajout d'un 
app.post('/add', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    
    var titre = req.body.titre;
    var begindate = req.body.begindate;
    var endingdate = req.body.endingdate;
    var date = new Date();
    con.query("INSERT INTO frise (titre,datedebut,datefin,datecreation,datemodification) VALUES(?,?,?,?,?)",[titre,begindate,endingdate,date,date],function(err, result) {
    if (err){
        res.redirect('/add');
    }   else{
        res.redirect('/liste');
    }
    });
 });    


//Affichage d'une frise sélectionnée et de ses éléments
app.get('/frise/:id', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    var elements=[];
    var frises=[];
    con.query("SELECT * FROM frise", function (err, result) {
    if (err)
        throw err;
    frises=result;
    });
     var frise=null;
    con.query("SELECT * FROM frise where id='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    frise=result[0];
    });    
    con.query("SELECT * FROM element where id_frise='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    elements=result;
    res.render('frise',{elements,frises,frise});   
    });    
});

// Sauvegarde d'une frise ayant été modifiée
app.post('/frise/:id', function (req, res) {
    app.use(express.static(__dirname+'/ressources'));
    var elements=JSON.parse(req.body.data);
    
    //suppression des anciens éléments
    con.query("DELETE FROM element WHERE id_frise=?",[req.params.id],function(err, result) {
    if (err)
        throw err;
    });
    //ajout des nouveaux éléments
    elements.forEach(function(elem){
        var descr=elem[0].popup_html=="undefined"?"":"description='"+elem[0].popup_html+"',";
        var classname=elem[0].className=="undefined"?"styleA":", classname='"+elem[0].className+"'";
        
       con.query("INSERT into element set id_frise='"+req.params.id+"',titre='"+elem[0].id+"',"+descr+" datedebut='"+elem[0].start+"', datefin='"+elem[0].end+"'"+classname+"",function (err, result) {
        if (err)
            throw err;
        }); 
    });
    
   //préparation de l'affichage de la frise mise a jour
    var frise=null;
    con.query("SELECT * FROM frise where id='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    frise=result[0];
    });    
    var frises=[];
    con.query("SELECT * FROM frise", function (err, result) {
    if (err)
        throw err;
    frises=result;
    });
    var elements=[];
    con.query("SELECT * FROM element where id_frise='"+req.params.id+"'", function (err, result) {
    if (err)
        throw err;
    elements=result;
    res.render('frise',{elements,frise,frises});   
    });    
});



app.listen(8080, function () {
    console.log('listening on port 8080!')
})
