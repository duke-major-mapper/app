const mysql = require('mysql');
const extend = require('lodash').assign;
const config = require('../../config.json');

const options = {
    user: config['MYSQL_USER'],
    password: config['MYSQL_PASSWORD']
  };
  
  const connection = mysql.createConnection(extend({
    multipleStatements: true
  }, options));

  if (config['INSTANCE_CONNECTION_NAME'] && config['NODE_ENV'] === 'production') {
    options.socketPath = `/cloudsql/${config['INSTANCE_CONNECTION_NAME']}`;
  }
  
  connection.query('USE major_data;');
  module.exports = connection;
