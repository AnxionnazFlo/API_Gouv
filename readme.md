# Projet API.Gouv

## 1. Contexte de l'évaluation 

Module de formation XML/Ajax.  
L'objectif est de faire une application mono-page permetant de chercher des bâtiments administratifs en France.  
Nous avons à disposition les APIs du gouvernement.  
https://api.gouv.fr/documentation/api_etablissements_publics


#### 1.1 Fonctionnalitées désirées :

- Créer dynamiquement une liste ordonnée des départements
- Récupérer dynamiquement la liste des villes du département sélectionné
- Afficher les bâtiments administratifs sélectionnés sur la carte
- Les markers des bâtiments doivent permettrent d'obtenir les informations disponibles sur l'administration
- Gérer l'affichage de la carte, l'affichage ou non des markers

#### 1.2 Contrainte technique : 

- Toute la page doit être gérée en Front
- Pas de langage back

## 2. Environnement technique

- HTML 5 / CSS 3 / BOOTSTRAP 5
- JS Vanilla
- LEAFLET / MAPBOX
- Pas de Design Patern pour ce petit projet


## 3. Procédure de mise en place en local

- Cloner le fichier sur votre ordinateur avec  
  `git clone https://github.com/AnxionnazFlo/API_Gouv`

- Créer une fichier .env à la racine du Projet

- Générer un token sur MapBox pour faire fonctionner la carte
    https://docs.mapbox.com/help/getting-started/access-tokens/

- Ecrire votre token (dans le fichier .env) pour l'API MapBox sous la forme : `const tokenMapBox = 'votre_token_ici`

- Tout devrais fonctionner à présent

#### Have fun



 



