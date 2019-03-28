// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '111.11.111.11', // Insert IP 
      database: 'DBNAME', // Database Name
      user:     'DBUSERNAME', // Database Username
      password: 'DBPASSWORD' // Database Password
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '111.11.111.11', // Insert IP 
      database: 'DBNAME', // Database Name
      user:     'DBUSERNAME', // Database Username
      password: 'DBPASSWORD' // Database Password
    }
  }

};
