const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing the models
import Event from './models/eventModel';

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

const port = config.server.port;
const app = express();

// Setting up CORS
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database.mongodb.url, config.database.mongodb.options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo is now connected');
});

// Getting all events
app.get('/api/events', async (req: any, res: any) => {
  let events = await Event.find();
  res.send(events);
});

// app.get('/api/event/test', async (req:any, res:any) => {
//   let newEvent = new Events();

//   newEvent.owner = 123;
//   newEvent.created = new Date();
//   newEvent.title = 'hello testing'

//   await newEvent.save();
//   res.send(newEvent)
// })

// Getting an individual event
app.get('/api/event/:eventId', async (req: any, res: any) => {
  let event = await Event.findById(req.params.eventId);
  res.send(event);
});

// Creates a new event
app.post('/api/event', async (req: any, res: any) => {
  let newEvent = new Event(req.body);

  // Check on the data
  if (newEvent.verify()) {
    await newEvent.save((err) => {
      if (err) return console.error(err);
    })
    res.send({
      status: true,
      data: newEvent
    })
  }

  res.send({
    status: false,
    message: 'Failed to verify data'
  })
});

app.put('/api/event', async (req: any, res: any) => {
  const results = await Event.updateOne({ _id: mongoose.Types.ObjectId(req.body.id) }, req.body);
  if (results.nModified === 1) {
    res.send({
      status: true,
      data: req.body
    })
  }
  // Failed to find and update event
  res.status(500);
  res.send({status: false})
});

app.delete('/api/event', async (req: any, res: any) => {
  await Event.deleteOne({ _id: mongoose.Types.ObjectId(req.body.eventId) }, (err) => {
    if (err) {
      // Failed to delete event
      res.status(500);
      res.send({
        status: false
      })
    }
    res.send({status: true, data: req.body})
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});