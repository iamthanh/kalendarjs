import axios from 'axios';

interface event {
    'title': string,
    'description': string,
    'startDateTime': Date,
    'endDateTime': Date,
    'allDay': boolean
}

interface existingEvent extends event {
    'id': string 
}

const Api = {

    getEvents: async () => {
        let results = await axios.get('http://localhost:8080/api/events').then((res) => {
            if (res && res.data && res.status < 400) {
                return res.data;
            } else {
                return {status: false, message: 'Failed to fetch events'}
            }
        }).catch((err) => {return {status: false, error: err}})
        return results;
    },
    createNewEvent: async (data: event) => {
        let results = await axios.post('http://localhost:8080/api/event', data).then((res) => {
            if (res && res.data && res.status < 400) {
                return res.data;
            } else {
                return {status: false, message: 'Failed to create new event'}
            }
        }).catch((err) => {return {status: false, error: err}})
        return results;
    },
    updateEvent: async (data: existingEvent) => {
        let results = await axios.put('http://localhost:8080/api/event', data).then((res) => {
            if (res && res.data && res.status < 400) {
                return res.data;
            } else {
                return {status: false, message: 'Failed to update event'}
            }
        }).catch((err) => {return {status: false, error: err}})
        return results;
    }
}

export default Api;