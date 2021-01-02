const db = require('../../config/mysql2/db');

exports.getEvents = () => {
    return db.promise().query('SELECT * FROM Event')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getEventById = (eventId) => {

};

exports.createEvent = (newEventData) => {

};

exports.updateEvent = (eventId, eventData) => {

};

exports.deleteEvent = (eventId) => {

};