var config = require('config');
var mosca = require('mosca');


var config_broker = config.get('Broker');


var pubsubsettings = {
  type: 'mongo',
  url: config_broker.mongo.url,
  pubSubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: config_broker.mosca.port,
  backend: pubsubsettings
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client){
  console.log("Got a client, yo!", client.id);
})

server.on('published', function(packet, client){
  console.log('Published', packet.payload);
});


function setup(){
  console.log("Mosca server is up and running!");
}
