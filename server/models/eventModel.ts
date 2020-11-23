const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    owner: Number,
    created: String,
    title: String,
    description: String,
    startDateTime: String,
    endDateTime: String,
    allDay: Boolean,
    members: Array
});

eventSchema.methods.verify = (data) => {
    return true;
}

export default mongoose.model('Event', eventSchema);

