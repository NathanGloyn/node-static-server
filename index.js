var fs =  require('fs');
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var staticContent = require('./staticContent');

var handle = {};
handle['/'] = requestHandlers.staticContent;
handle['staticContent'] = staticContent.staticContent;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);