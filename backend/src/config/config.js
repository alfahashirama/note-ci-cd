require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'notesdb',
    host: 'postgres',
    dialect: 'postgres',
  },
  test: { /* ... */ },
  production: { /* ... */ }
};