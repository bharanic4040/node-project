
/*
//1. START SERVER//
  cassandra -f
//2. START CQL CLIENT SHELL//
  >>cqlsh
  127.0.0.1:9042.
  */

 const cassandra = require('cassandra-driver');

 const client= new cassandra.Client({ contactPoints: ['127.0.0.1:9042']});

 module.exports = client;
