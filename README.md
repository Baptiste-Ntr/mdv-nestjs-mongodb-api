## Installation

```bash
$ npm install
```

## Running the app

```bash
# with docker
$ docker-compose up -d

# without docker
$ npm run start:dev
```

# API Documentation

Cette API a pour but d'avoir les infos des teams de Formule 1, et de pouvoir en ajouter, modifier, ou supprimer.

## Routes

### GET /teams

This route return a list of all teams

**Response :**

```json
{
    "_id": "String",
    "name": "String",
    "base": "String",
    "championshipsWon": "Number"
}

{
    ...
}
```

### GET /teams/:teamName

This route return a specific team

**Response :**

```json
{
    "_id": "String",
    "name": "String",
    "base": "String",
    "championshipsWon": "Number"
}
```

### POST /teams

This route add a team with a body

**Body :**

```json
{
    "name": "String",
    "base": "String",
    "championshipsWon": "Number"
}
```

### PUT /teams/:teamName

This route update a team with a body

**Body :**

```json
{
    "name": "String",
    "base": "String",
    "championshipsWon": "Number"
}
```

### DELETE /teams/:teamName

This route delete a specific team

