import axios from 'axios';

interface newEvent {
    'title': string,
    'description': string,
    'startDateTime': Date,
    'endDateTime': Date,
    'allDay': boolean
}

const Api = {

    createNewEvent: async (data: newEvent) => {
        let results = await axios.post('http://localhost:8080/api/event', data).then((res) => {
            if (res && res.data && res.status < 400) {
                return res.data;
            } else {
                return {
                    status: false,
                    message: 'Failed to create new Event'
                }
            }
        }).catch((err) => {
            return {
                status: false,
                error: err
            }
        })
        return results;
    }
}

export default Api;