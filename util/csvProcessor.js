define(function () {
	var fs = require("fs");

	function isValidEmail(email) {
		if (email.indexOf('@')>0 && email.indexOf('.') > 0 && email.indexOf('.') > email.indexOf('@')) {
			return true;
		} else {
			return false;
		}
	}
    function processFile(data, fields) {
    	var stats = {
			validEmail: 0,
			firstNames: 0,
			lastNames: 0,
			total: 0,
			previewData: []
		};

		if (data) {

			var theData = data.split('\n'),
				 i = 1,
				 curRecord = '';

				for (i; i<theData.length; i++) {
					if (i>0) {
						
						curRecord = theData[i].split(',');
						
						if (curRecord) {

							toAddObj = i<=10 ? {} : '';
							
							if (curRecord[fields.firstName]) {
								toAddObj.firstName = curRecord[fields.firstName];
								stats.firstNames++;
							}

							if (curRecord[fields.lastName]) {
								toAddObj.lastName = curRecord[fields.lastName];
								stats.lastNames++;
							}

							if (curRecord[fields.email] && isValidEmail(curRecord[fields.email])) {
								toAddObj.email = curRecord[fields.email];
								stats.validEmail++;
							} 


							if (typeof toAddObj !== 'string') {
								stats.previewData.push(toAddObj);
							}


						}
						stats.total++;

					}
				}

			}
			return stats;
		};

	return {
		parseUpload: function(fileObj, fields, response) {
			var rtrn = '';

			if (fileObj && fileObj.file && fileObj.file.length && fileObj.file[0].path) {
				fs.readFile(fileObj.file[0].path, 'utf8', function (err,data) {

					var fieldNums = {
						firstName: fields.first[0] || 1,
						lastName: fields.last[0] || 0,
						email: fields.email[0] || 2
					}
					
					var stats = processFile(data, fieldNums);

					response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8000'});
   
   					response.end(JSON.stringify(stats) + '\n\n');
		
					
  				
				 });
			 } else {
	      			response.json(200, '{error: 500}');
			 }
		}.bind(this)	
	};
});
