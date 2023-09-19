# MediaChat

MediaChat est un outil permettant aux streamers de diffuser des médias sur OBS

Cet outil est très simple d'utilisation, le plus complexe est de mettre en place le serveur.

Cet outil permet
- La modification de la taille du média
- Le choix de la position du média
- L'ajout de texte (couleur, police d'écriture)

Une implémentation avec Discord est également disponible, vous pouvez donc envoyer des fichiers avec Discord

Une fois déployé, vous vous retrouvez avec 2 pages :
- Upload
- Stream

# Sur la page Upload
Vous pouvez entrer le nom du streamer concerné pour avoir une prévisualisation du résultat qui sera affiché sur le stream

Vous avez deux choix, soit vous importez un fichier de votre ordinateur, soit vous utilisez un lien twitter, Discord... Si vous voulez une réponse instantanée, privilégiez les liens.

Accessible à `exemple.fr`

Astuce : mettez vos vidéos sur Discord, copiez le lien et collez-le sur la page upload

## Discord

Grâce à l'implémentation Discord, vous n'êtes pas obligé d'héberger le serveur sur un VPS, vous pouvez l'héberger sur votre ordinateur et utiliser Discord pour envoyer les fichiers.
Les utilisateurs ne pourront pas utiliser la page upload, mais la version bot est assez complète.

### Les commandes

- `/sendfile` : affiche les commandes disponibles
  - `file` : le fichier à envoyer (requis)
  - `positionx` : la position en x du fichier `left | center | right`, par défaut `center`
  - `positiony` : la position en y du fichier `top | center | bottom`, par défaut `center`
  - `text` : le texte à afficher
  - `text_positionx` : la position en x du texte `left | center | right`, par défaut `center`
  - `text_positiony` : la position en y du texte `top | center | bottom`, par défaut `center`
  - `text_font` : la police d'écriture du texte, par défaut `Arial`
  - `text_font_size` : la taille de la police d'écriture du texte, par défaut `56`
  - `ratio` : taille du fichier x ratio => agrandit ou rétrécit le fichier, par défaut `1`
  - `fullscreen` : affiche le fichier en plein écran, par défaut `false`
  - `anonymous` : affiche le pseudo et l'image de profil de l'envoyeur, par défaut `false`
  - `timestamp` : indique le moment où le média doit être joué, par défaut `0`
  - `muted` : indique si le média doit être muet, par défaut `false`
  - `greenscreen` : indique si le média possède un fond vert, par défaut `false` (Attention, ce paramètre nécessite une configuration supplémentaire d'OBS)
  - `user` : permet d'afficher un média que pour une personne, cela ce fait en mentionnant la personne concernée, par défaut `tout le monde`
  
- `/sendtext` : envoie un texte sur la page stream
  - `text` : le texte à afficher
  - `positionx` : la position en x du texte `left | center | right`, par défaut `center`
  - `positiony` : la position en y du texte `top | center | bottom`, par défaut `bottom`
  - `font` : la police d'écriture du texte, par défaut `Arial`
  - `font_size` : la taille de la police d'écriture du texte, par défaut `56`
  - `user` : permet d'afficher le texte que pour une personne, cela ce fait en mentionnant la personne concernée, par défaut `tout le monde`

- `/flush` : vide l'affichage de la page stream
  - `user` : permet de flush que pour une personne, cela ce fait en mentionnant la personne concernée, par défaut `tout le monde`
  
- `/setup` : permet de configurer des options du serveur
  - `queue` : permet d'activer ou désactiver la file d'attente, par défaut `false`

- `/skip` : permet de passer à la vidéo suivante
  - `user` : permet de skip que pour une personne, cela ce fait en mentionnant la personne concernée, par défaut `tout le monde`


# Sur la page Stream

C'est ici que tous les médias seront affichés

Vous devez configurer OBS en ajoutant une nouvelle page web

Accessible à `exemple.fr/stream?key=ton_username_discord`

Le paramètre key sera un username discord pour que les gens puissent envoyer un média, text ou flush la personne concernée,

# Déploiement
Pour déployer le projet, soit vous passez par un VPS pas cher, soit vous l'hébergez vous-mêmes ou vous cherchez pour des solutions de déploiement gratuites, mais très limitée (seulement le bot, les liens et les textes seront viables)

## Les variables d'environnement
Vous devez créer un fichier `.env` à la racine du projet, celui-ci contient les variables d'environnement suivantes :
- `PORT` : le port sur lequel le serveur va écouter, par défaut `3000`
- `ENVURL` : l'url du serveur, par défaut `http://localhost:3000`
- `clientId` : l'id du bot Discord
- `guildId` : l'id du serveur Discord
- `token` : le token du bot Discord
- `role` : le rôle qui protégera pour le bot Discord, par défaut `false`
- `sourceName` : Le nom de la source OBS qui permettra d'activer / désactiver le fond vert, par défaut `mediachat`

## Mise en route
Vous devez avoir nodejs d'installé sur votre machine

La première commande va installer les prérequis
`npm install`

Configurez le fichier `.env`

La seconde commande va démarrer le serveur `npm start`

### Gestion des fonds verts

Pour utiliser les fonds verts, vous devez ajouter une source navigateur dans votre scene OBS, le nom de la source de votre scène doit être le même que celui dans le fichier `.env` (par défaut, `mediachat`)

Ensuite, vous devez activer le serveur websocket d'obs pour que la page web puisse intéragir avec OBS

Pour cela, allez dans Outils, Paramètres du serveur WebSocket, puis cochez la case `Activer le serveur WebSocket`, vérifiez également que le port du serveur websocket soit de `4455` et que `Utiliser l'authentification` soit décoché.

Vérifiez que le filtre `greenscreen` est bien ajouté sur la source OBS. Si ce n'est pas le cas, actualisez la source OBS.

Une fois cela fait, dès que vous allez utiliser l'option greenscreen, le fond vert s'activera automatiquement.

## Le bot Discord

Pour utiliser le bot, vous devez créer une application sur le site de Discord, puis créer un bot et récupérer le token, les configurations se font dans le fichier `.env`

Dans le fichier config, vous retrouverez également un champ `role` qui permet de protéger le bot pour les utilisateurs ayant le rôle `MediaChat`
# Contact
Si vous souhaitez me contacter, j'ai un serveur [Discord](https://discord.gg/uwcTrVe68r)

# Donation
Si vous souhaitez me soutenir, vous pouvez me faire un don sur [buymeacoffee](https://www.buymeacoffee.com/Alorf)