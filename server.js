var http = require("http");
var url = require("url");
var path = require("path");

function start(route, handle) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle,pathname, request, response);
	};

	http.createServer(onRequest).listen(9000);

	console.log("Server has started");
};

exports.start = start;