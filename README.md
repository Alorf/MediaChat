# MediaChat

MediaChat est un outil permettant aux streamers de diffuser des médias sur OBS

Cet outil est très simple d'utilisation, le plus complexe est de mettre en place le serveur.

Cet outil permet
- La modification de la taille du média
- Le choix de la position du média
- L'ajout de texte (couleur, police d'écriture)

Une implémentation avec Discord est également disponnible, vous pouvez donc envoyer des fichiers avec Discord

Une fois déployé, vous vous retrouvez avec 2 pages :
- Upload
- Stream

# Sur la page Upload
Vous pouvez entrer le nom du streamer concerné pour avoir une prévisualisation du résultat qui sera afficher sur le stream

Vous avez deux choix, soit vous importez un fichier de votre ordinateur, soit vous utilisez un lien twitter, Discord... Si vous voulez une réponse instantanée, privilégiez les liens.

Accessubke à `exemple.fr`

Astuce : mettez vos vidéos sur Discord, copiez le lien et collez-le sur la page upload

## Discord

Grâce à l'implémentation Discord vous n'êtes pas obligé d'héberger le serveur sur un VPS, vous pouvez l'héberger sur votre ordinateur et utiliser Discord pour envoyer les fichiers.
Les utilisateurs ne pourront pas utiliser la page upload, mais la version bot est assez complète.

### Les commandes

- `/sendfile` : affiche les commandes disponibles
    - `file` : le fichier a envoyer (requis)
    - `positionx` : la position en x du fichier `left | center | right`, par défaut `center`
    - `positiony` : la position en y du fichier `top | center | bottom`, par défaut `center`
    - `text` : le texte à afficher
    - `text_positionx` : la position en x du texte `left | center | right`, par défaut `center`
    - `text_positiony` : la position en y du texte `top | center | bottom`, par défaut `center`
    - `text_font` : la police d'écriture du texte, par défaut `Arial`
    - `text_font_size` : la taille de la police d'écriture du texte, par défaut `56`
    - `ratio` : taille du fichier x ratio => agrandit ou rétrécit le fichier, par défaut `1`
    - `fullscreen` : affiche le fichier en plein écran, par défaut `false`
- `/sendtext` : envoie un texte sur la page stream
  - `text` : le texte à afficher
  - `positionx` : la position en x du texte `left | center | right`, par défaut `center`
  - `positiony` : la position en y du texte `top | center | bottom`, par défaut `bottom`
  - `font` : la police d'écriture du texte, par défaut `Arial`
  - `font_size` : la taille de la police d'écriture du texte, par défaut `56`
- `/flush` : vide l'affichage de la page stream

# Sur la page Stream
Vous devez configurer OBS en ajoutant une nouvelle page web

Accessible à `exemple.fr/stream`

# Déploiement
Pour déployer le projet, soit vous passez par un VPS pas cher, soit vous l'hébergez vous-mêmes ou vous cherchez pour des solutions de déploiement gratuite, mais très limitée (seulement les liens et les textes seront viables)

## Les variables d'environnement
- `PORT` : le port sur lequel le serveur va écouter, par défaut `3000`
- `ENVURL` : l'url du serveur, par défaut `http://localhost:3000`

## Mise en route
Vous devez avoir nodejs d'installer sur votre machine

La première commande va installer les prérequis
`npm install`

La seconde commande va démarer le serveur `npm start`

## Le bot Discord
Dans le dossier `Discord`, vous avez un fichier `config.json`, vous devez y mettre le `clientId`, le `guildId` et le `token` de votre bot Discord
# Contact
Si vous souhaitez me contacter, j'ai un serveur Discord : https://discord.gg/uwcTrVe68r

# Donation
Si vous souhaitez me soutenir, vous pouvez me faire un don sur buymeacoffee : https://www.buymeacoffee.com/Alorf
