var fs = require('fs');
var path = require('path');
var responseCode = require('./responseCode');

function staticContent(request,response, fileName){

	var extensions = {
		'.html' : 'text/html',
		'.css' : 'text/css',
		'.js' : 'application/javascript',
		'.png' : 'image/png',
		'.gif' : 'image/gif',
		'.jpg' : 'image/jpeg'
	};
	
	var oneDay = 86400000;
	
	console.log("Request handler for static content called");

	if(request.method !== 'GET' && request.method !== 'HEAD' ){
		responseCode.responseCode(response, 405);
		return;
	}
	
	console.log('FileName: ' + fileName);
	var fileToRead = fileName || 'index.html';
	var ext = path.extname(fileName);
	console.log('Server file: ' + fileToRead);
	
	console.log("modified since: " + request.headers['if-modified-since']);
	
	var modifedSince = new Date(request.headers['if-modified-since']);

	var lastModified = null;
	fs.exists(fileToRead, function(exists){
		
		if(!exists){
			responseCode.responseCode(response, 404);
			return;
		}
		
		fs.stat(fileToRead, function(err, stats){
			if(err){
				console.log('error trying to get file stats: ' + err);
				responseCode.responseCode(response, 500);
				return;
			}
			
			lastModified = new Date(stats.mtime);
	
			console.log('Modified Since: ' + modifedSince + ', Last Modified: ' + lastModified);	
			if(modifedSince <= lastModified){
				responseCode.responseCode(response, 304);
				return;
			}
		});	
			
	});
	
	
	fs.readFile(fileToRead, function (err,data){
		if(err){
			responseCode.responseCode(response,404);
			return;
		}
		
		var statusCode = 200;
		if(response.method == "HEAD"){
			statusCode = 204;
		}
		
		response.writeHead(statusCode, {"Content-Type": extensions[ext], 
		"Content-Length": data.length,
		"Cache-Control": "public, max-age=" + oneDay,
		"Last-modified": lastModified});
		
		if(request.method == 'GET'){
			response.write(data);
		}
		response.end();		

	});
}


exports.staticContent = staticContent;