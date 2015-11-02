
var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});


var express = require('express');


var app = express();
 var multiparty = require('multiparty');




var http = require("http");

http.createServer(function (request, response) {

	if (request.url === '/evaluate' && request.method === 'POST') {

 	   var form = new multiparty.Form();
	
 	    form.parse(request, function(err, fields, files) {

 	    	var msg = "upload";

 	    	var uploadParser = requirejs('./util/csvProcessor');
 	    	uploadParser.parseUpload(files, fields || {}, response);
	    });
	}

	
}).listen(8080);



// app.post('/evaluate', function (request, response) {
		
// 	   var form = new multiparty.Form();
	
// 	    form.parse(request, function(err, fields, files) {

// 	    	var msg = "upload";

// 	    	var uploadParser = requirejs('./util/csvProcessor');
// 	    	//var par = uploadParser.parseUpload(files, fields || {}, response);

// 	    	response.type('applicaton/json');
//   			response.send('{ message: "hooray! welcome to our api!" }');

	    	

//     	    });
	
// }.bind(this));


