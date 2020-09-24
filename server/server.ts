const express = require("express");
const mongoose = require('mongoose');
import Events from './models/eventModel';

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

const port = config.server.port;
const app = express();

mongoose.connect(config.database.mongodb.url, config.database.mongodb.options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo is now connected');
});

// Getting all events
app.get('/api/events', async (req:any, res:any) => {
  let events = await Events.find();
  res.send(events);
})

// app.get('/api/event/test', async (req:any, res:any) => {
//   let newEvent = new Events();

//   newEvent.owner = 123;
//   newEvent.created = new Date();
//   newEvent.title = 'hello testing'

//   await newEvent.save();
//   res.send(newEvent)
// })

// Getting an individual event
app.get('/api/event/:eventId', async (req:any, res:any) => {
  let event = await Events.findById(req.params.eventId);
  res.send(event);
})

// Creates a new event
app.post('/api/event', (req:any, res:any) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

export {};