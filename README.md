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

### Email configuration

The system implements the Adonis Mail system based in node mail code.
All the configuration can be done trough .env files

> Production and testing hava their configuration files. Keep in mind before proceed.

```yml
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
MAIL_USERNAME=example@example.com
MAIL_PASSWORD=password_example

MAIL_BASE_URL=${APP_URL}/restore-password
MAIL_APP_EMAIL=${MAIL_USERNAME}
MAIL_APP_NAME=TaskManager
```

## Testing
**Migrations first**
Execute unit test running the following command with adonis

```sh
adonis test
```

### LICENSE
GNU GENERAL PUBLIC LICENSE
