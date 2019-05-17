# [Moon] Task manager - __In development__

API Taskmanager - API Rest implementation

## Requirements
Min. requirements to execute this project

* [Node >= 10](https://nodejs.org/en/)
* [Adonis CLI](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs)
* Suported Databases: MySQL, SQLite, Postgres

## Get Started
Install all the dependencies with 

```sh
npm install
```

Copy the environment file called __.env.example__ with the name __.env__

```sh
# Linux|macOs
cp .env.example .env
```

Configure your database and then execute migrations 

```sh
adonis migration:run
```

If you want to use Eslint with this project you can use it.


## Testing
**Migrations first**
Execute unit test running the following command with adonis

```sh
adonis test
```

### LICENSE
GNU GENERAL PUBLIC LICENSE
