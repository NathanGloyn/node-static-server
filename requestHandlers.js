function upload(request,response) {
	console.log("Request handler for 'upload' called");
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("Hello upload");
	response.end();
}

exports.upload = upload;