![logo](https://hal.archives-ouvertes.fr/UNIV-PARIS-SACLAY/public/logo_UP_saclay_final.png)

## **Chronofrise.**

> The application **ChronoFrise** is a tool that will allow **Music** students of the **Unversity of Evry Val d'Essonne** to:

> - <i class="icon-file"></i> create
> - <i class="icon-trash"></i> remove
> - <i class="icon-pencil"></i> edit
> - <i class="icon-upload"></i> upload
> - <i class="icon-hdd"></i> and export as PDF a timeline.

> This computer timeline gives an overview of the evolution of areas of knownledge and historical processes.
> It will help to understand their  relationships and inflences.
> Interactivity will allow the user to decide the disciplines (music, literature,...)and processes (political,economic,...).

## **Contributors**

 - Sebastien BOURDIN
 - Aminata CISSE
 - Thiepthy KANAGASABAI
 
----------
## **Prerequisites**
 - Nodejs [(Installation link)](https://nodejs.org/en/)
 - Github [(Instructions)](https://git-scm.com/downloads)

----------
## **Technologies used**
 
 - Nodejs [(Installation link)](https://nodejs.org/en/)
 - Mysql 
 - HTML,CSS, BOOTSTRAP


----------
## **Installation**

    git clone https://github.com/SebastienBourdin/ChronoFrise.git

> Once you have downloaded the project, position yourself on the project in the terminal and execute the following commands :

 1. Install the dependencies
 
    npm install
    

 2. Launch the server 
 
    node app.js
   
----------
## **Configuring the database in app.js**

> **Warning!** Do not forget to import the database 

       var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "frise"
    })
