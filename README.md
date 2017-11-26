![logo](https://hal.archives-ouvertes.fr/UNIV-PARIS-SACLAY/public/logo_UP_saclay_final.png)

## **Projet Chronofrise.**

> L'application **ChronoFrise** est un outil qui va permettre aux étudiants de **Musique** de l'**Université d'Evry val d'Essonne** de:

>- <i class="icon-file"></i> créer
> - <i class="icon-trash"></i> supprimer
>- <i class="icon-pencil"></i> modifier
>- <i class="icon-upload"></i> télécharger
> - <i class="icon-hdd"></i> et exporter en pdf une frise chronologique.

> Cette frise chronologique informatique donne une vue d’ensemble de
> l’évolution de domaines de savoir et processus historiques.
> Elle permettra notamment de comprendre leurs relations et influences.
> L’interactivité permettra à l’utilisateur de décider des disciplines
> (musique, littérature…), et des processus (politiques, économiques…).

## **Contributeurs**

 - Sebastien BOURDIN
 - Aminata CISSE
 - Thiepthy KANAGASABAI
 
----------
##**Prérequis**
 - Nodejs [(Lien pour l'installation)](https://nodejs.org/en/)
 - Github [(Instructions)](https://git-scm.com/downloads)

----------
## **Technologies utilisés**
 

 - Nodejs [(lien pour l'installation)](https://nodejs.org/en/)
 - Mysql 
 - HTML,CSS, BOOTSTRAP


----------
## **Installation**

    git clone https://github.com/SebastienBourdin/ChronoFrise.git
> Une fois avoir télécharger le projet, se positionner sur le projet et exécute les  > commandes suivantes :

 1. Installer les dépendances
 
    npm install
    

 2. Lancer le serveur 
 
    node app.js
   
----------
## **Configuration de la base de données dans app.js**

> **Attention!** ne pas oublier d'importer la base de données

       var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "frise"
    })
