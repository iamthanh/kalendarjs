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
    // TODO: work on this function to verify if the inputs are valid
    return true;
}

export default mongoose.model('Event', eventSchema);

