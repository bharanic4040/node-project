
/*
//1. START SERVER//
  cassandra -f
//2. START CQL CLIENT SHELL//
  >>cqlsh
  127.0.0.1:9042.
  */

  const config1= require('../middlewares/config');
 const cassandra = require('cassandra-driver');

 const client= new cassandra.Client({ contactPoints: [config1.CASSANDRA_HOST_CONNECT]});

 module.exports = client;
