function responseCode(response, code, data){
	switch(code){
		case 200:
			response.writeHead(200, {"Content-Type":"text/html"});
			response.write(data);
			break;
		
		case 304:
			response.statusCode=304;
			break;
		
		case 404:
			response.writeHead(404, {"Content-Type":"text/plain"});
			response.write("404 Not found");
			break;
		
		case 405:
			response.writeHead(405, {"Content-Type":"text/plain"});
			response.write("405 Method not allowed");
			break;
		
		case 500:
			response.statusCode = 500;
			break;
	}
	
	response.end();
}

exports.responseCode = responseCode;