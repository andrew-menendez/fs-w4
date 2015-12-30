//problem: want to checlk user's badge count on webpage
//solution: use node to do the server lookup, and serve data to the template via html

// 1. create a webserver

var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;


var router=require('./router.js')

console.log('hello')
  
  
http.createServer(function (request, response){
	router.home(request,response);
	router.user(request,response);
}).listen(port);
  console.log('Server running at http://'+hostname+':'+port);


	




