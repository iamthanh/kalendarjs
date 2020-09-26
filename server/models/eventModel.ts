const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    owner: Number,
    created: String,
    title: String,
    description: String,
    startTime: String,
    endTime: String,
    allDay: Boolean,
    members: Array
});

export default mongoose.model('Event', eventSchema);

