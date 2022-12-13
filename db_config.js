const config = {
    db: {
      // Don't expose password or any sensitive info, for demo only
      // Hardcoded Values
        host: 'winhost',                  //replace with SQL server host
        user: 'wsl_root',                 //replace with SQL server username
        password: 'password',             
        database: 'alternative_housing',
        port: 3306
    }
  };

  module.exports = config;