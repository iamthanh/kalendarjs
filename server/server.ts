const express = require("express");
const mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

console.log(config);

const port = config.server.port;

const app = express();

mongoose.connect(config.database.mongodb.url, config.database.mongodb.options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

// Getting all events
app.get('/api/events', (req, res) => {
  
})

// Getting an individual event
app.get('/api/event/:eventId', (req, res) => {

})

// Creates a new event
app.post('/api/event', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})