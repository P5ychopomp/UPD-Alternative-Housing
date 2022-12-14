# UPD Alternative Housing Dev

## Installation

Install the required dependencies in the package.json with

```bash
npm install
```

## Usage

Make sure you have installed all the dependencies in the package.json.

### JSON Server

1. Change the db_config.js to your desired database configuration. Below is the default config:

```js
host: 'localhost',                  
user: 'root',                 
password: 'password',             
database: 'alternative_housing',
port: 3306
```

2. Run the json-server from the terminal with

```bash
json-server -p your_port --watch ./sample_databasee/sampledatabase2.json
```

```bash
json-server -p 8080 --watch ./sample_databasee/sampledatabase2.json
```

### Client

Run React server with

```bash
npm start
```
