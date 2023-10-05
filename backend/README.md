# Tortue

> Un compagnon pour l'écologie au quotidien

## Prérequis

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [EditorConfig](https://editorconfig.org/)

## Bien commencer

- Installer la bonne version de Node.js

```shell
$ nvm use
```

- Installer les dépendances du projet

```shell
$ npm clean-install
```

- Démarrer l'application en mode développement

```shell
$ npm run start:dev
```

## Jouer avec docker

- Construire l'image Docker

```shell
$ docker build --file infra/Dockerfile . --tag tortue-ap
```

- Exécuter l'image Docker

```shell
$ docker run --env port=1337 --publish 1337:1337 --detach tortue-app
```

## TODO

- [ ] Feature(catalogue) : Ne conserver que l'élément ayant le pire impact (au lieu du premier) lors de la deduplication
- [ ] Idea(catalogue) : Ne garder que les éléments mesurer en kCo2
- [ ] Feature : Introduire une version simplifiée du catalogue/comparateur basée sur la moyenne des éléments similaires
- [ ] Style : Améliorer l'UI/UX du catalogue et du comparateur
- [ ] Test : Ajouter des tests frontend
- [ ] CI : Ajout de la génération du changelog
- [ ] Refactor : Passer à EJS (ou autre moteur de template) plus largement maintenu
- [ ] CI : Mettre en place GreenFrame pour monitorer l'impact eco
- [ ] Infra : Câbler un ElasticSearch-like (ex : ElasticSearch, MeiliSearch, etc.)
- [ ] Infra : Câbler un outil de suivi des logs (ex : ELK, Grafana, etc.)
- [ ] Docs : Automatiser le déploiement d'une solution de documentation
- [ ] Refactor : Utiliser HTMLX plutôt qu'Hbs pour retourner le HTML, cela permettra de propager l'utilisation du
      correlation ID
- [ ] Chore : Extraire les dotfiles dans une dossier dotfile afin d'alléger la racine
- [ ] Infra : Améliorer le Dockerfile via un two-stage Dockerfile
- [ ] Chore : Améliorer la gestion de la configuration (config service customer pour introduire des méthodes)
