
var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});

var multiparty = require('multiparty');
var http = require("http");

console.log('..... Listening on port 8080 ......');

http.createServer(function (request, response) {

	if (request.url === '/evaluate' && request.method === 'POST') {

 	   var form = new multiparty.Form();
	
 	    form.parse(request, function(err, fields, files) {
 	    	var uploadParser = requirejs('./util/csvProcessor');
 	    	uploadParser.parseUpload(files, fields || {}, response);
	    });
	}

	
}).listen(8080);


