
//start nginx - sudo nginx
//stop nginx - sudo nginx -s stop
//nginx on port 9080 for reverse proxy
//pm2 start index.js to start app


const cluster=require("cluster");

const numCPUs=require('os').cpus().length;

if(cluster.isMaster){

    for(var i=0;i<numCPUs;i++){
      cluster.fork();
    }
    Object.keys(cluster.workers).forEach(function(id) {
        console.log("Running with ID : "+cluster.workers[id].process.pid);
      });

    cluster.on('exit',function(worker,code,signal){
   console.log('worker '+worker.process.pid+ ' died...!');
    });
}else{
    //if it is worker
  require('./index.js');
}