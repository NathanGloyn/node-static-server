var path = require('path');

function route(handle, pathName, request, response){
	console.log("About to route a request for " + pathName);

	var fileName = path.basename(request.url);	
	console.log('Requested filename: ' + fileName);
	
	if(pathName === '/'){
		fileName = 'index.html';
		console.log('Root called, returning: ' + fileName);
	}
	
	var ext = path.extname(fileName);
	console.log('Ext: ' + ext);
	
	// If we have an extension route the call to the static content handler
	if(ext){
		handle['staticContent'](request, response, fileName);
		return;
	} 
	
	// Use the path name to see if we have a handler for the route, if so hand
	// execution off to that handler
	if(typeof handle[pathName] === 'function') {  
		console.log('PathName: ' + pathName + ', fileName: ' + fileName);
		handle[pathName](request,response);
	}
	
	// not static content and no handler so return a 404
	console.log('No request handler found for ' + pathName);
	response.writeHead(404, {"Content-Type":"text/plain"});
	response.write("404 Not found");
	response.end();
}

exports.route = route;