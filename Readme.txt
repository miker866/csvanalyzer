This simple web app has a node.js backend with a Javascript, AngularJS, HTML, and CSS front end. It is simple - the user selects a CSV file to upload, then they're asked to map certain columns. After sending the data to the server, they are presented with some simple statistics.

To install and run:
1) Install node.js
2) Git clone from https://github.com/miker866/csvanalyzer.git
3) Run "npm install" from within the directory you cloned the above in.
4) Within that same root directory, run 'gulp server'. This will start up the web server to server the pages, scripts, etc.
5) Within the same root directory too, also run 'node server.js'. This will start up the back end services

The webserver runs on port 8000 while the back end node server runs on 8080. If you need to run it on a different port than 8080, you will need to change formController.js in the submitForm function to a different port.

Troubleshooting:
* If you are getting 'gulp not found' types of error messages
	- You may need to modify your .bashrc file in your profile and put the following in:
			export PATH=$PATH:./node_modules/.bin
			