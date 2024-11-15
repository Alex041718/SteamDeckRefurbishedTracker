# Steam Deck Stock Checker

Ce projet a pour but de vérifier la disponibilité des Steam Deck reconditionnés sur la page de vente de Steam et d'envoyer un email d'alerte lorsque le nombre d'occurrences de "Out of stock" est différent de 3.

## Prérequis

- Node.js (version 16 ou supérieure)
- Docker (optionnel)

## Installation

1. Clonez ce dépôt :
    ```sh
    git clone <URL_DU_DEPOT>
    cd <NOM_DU_DEPOT>
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet avec les informations suivantes :
    ```env
    EMAIL_USER="votre.email@gmail.com"
    EMAIL_PASS="votre_mot_de_passe_applicatif_google"
    EMAIL_TO="destinataire.email@gmail.com"
    ```

## Utilisation

### Avec Node.js

1. Exécutez le script :
    ```sh
    node script.js
    ```

### Avec Docker

1. Construisez l'image Docker :
    ```sh
    docker build -t steamdeck-checker .
    ```

2. Lancez le conteneur Docker :
    ```sh
    docker-compose up -d
    ```

## Fonctionnement

Le script `script.js` effectue les actions suivantes :

1. Charge les variables d'environnement depuis le fichier `.env`.
2. Utilise Puppeteer pour accéder à la page de vente des Steam Deck reconditionnés.
3. Compte le nombre d'occurrences du texte "Out of stock".
4. Prend une capture d'écran de la page.
5. Envoie un email d'alerte si le nombre d'occurrences de "Out of stock" est différent de 3.

## Configuration

- Le fichier `.env` contient les informations de configuration pour l'envoi des emails.
- Le fichier `docker-compose.yml` permet de configurer et de lancer le conteneur Docker.

## Auteurs

- Alex