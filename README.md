# UPD Alternative Housing Dev

## Installation

For each directory (Frontend/ and Backend/) in the root folder, install the required dependencies using:

```bash
npm install
```

## Usage

Make sure you have installed all the dependencies in the package.json of each directory

### Database
1. The repository includes a sample database with fictitious listings in `/Backend/sample_databasee/AltHousingSampleDB.sql`. The script in `AltHousingSampleDB.sql` may be used to import the sample database into MySQL

2. Change the db_config.js to your desired database configuration. Below is the default config:

```js
host: 'localhost',                  
user: 'root',                 
password: 'password',             
database: 'alternative_housing',
port: 3306
```

### API Server
Start the server by going to the `Backend` directory and running
```bash
npm start
```
### Client

Start the React server by going to the `Frontend` directory and running

```bash
npm start
```

After this, the webpage may be accessed through `localhost:3000`
