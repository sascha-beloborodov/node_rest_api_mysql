##### Routing         : Express
##### ORM Database    : Sequelize (http://docs.sequelizejs.com/manual)
##### Authentication  : Passport, JWT

There is globally used: pm2, apidoc(if you write or fix directly API)

## Installation

#### Donwload Code | Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
npm install
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application



----

We use JWT auth, for access to private parts of the app you have to authorize/register before and then for an every request to use: 
Authorization: <taken token>



-----

API

Documentation -  ./apidoc/index.html

run apidoc: `apidoc -i routes/ -o apidoc/`

----

IMPORTANT:
- Change existing models and migrations make manually!!!
- Never run on production - `models.sequelize.sync()` in app.js
- We use simple ESLint. Check .eslintrc.json and set linter in your IDE/editor

------

Useful commands:

`node_modules/.bin/sequelize db:migrate` - run migration
`node_modules/.bin/sequelize db:seed:all` - rus seeds