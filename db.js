const knex = require('knex');
const knexConfig = require('./knexfile'); 

const db = knex(require('./knexfile').development);
module.exports = db;