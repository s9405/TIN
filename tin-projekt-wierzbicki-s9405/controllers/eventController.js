const EventRepository = require('../repository/mysql2/EventRepository');
const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const PlayingFieldRepository = require('../repository/mysql2/PlayingFieldRepository');

exports.showEventList = (req, res, next) => {
    EventRepository.getEvents()
        .then(events => {
            res.render('pages/event/list',{
                events: events,
                navLocation: 'event'
            });
        });
}

exports.showEditEventForm = (req, res, next) => {
    let allPlayers, allPlayingFields;
    let eventData; 
    const eventId = req.params.eventId;
    PlayingFieldRepository.getPlayingFields()
        .then(playingFields => {
            allPlayingFields = playingFields;
            return PlayerRepository.getPlayers();
        })
        .then(players =>{
            allPlayers = players;
            return EventRepository.getEventById(eventId);
        })
        .then(event => {
            eventData = event;
            res.render('pages/event/form', {
                event: eventData,
                allPlayers: allPlayers,
                allPlayingFields: allPlayingFields,
                pageTitle: 'Edycja eventu',
                btnLabel: 'Edytuj event',
                formAction: '/events/edit',
                navLocation: 'event',
                formMode: ''
            });
        });
} 

exports.showAddEventForm = (req, res, next) => {
    let allPlayers, allPlayingFields
    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;
            return PlayingFieldRepository.getPlayingFields();
        })
        .then(playingFields => {
            allPlayingFields = playingFields;
            res.render('pages/event/form', {
                event: {},
                formMode: 'createNew',
                allPlayers: allPlayers,
                allPlayingFields: allPlayingFields,
                pageTitle: 'Nowy event',
                btnLabel: 'Dodaj event',
                formAction: '/events/add',
                navLocation: 'event'
            });
        });
}

exports.showEventDetails = (req, res, next) => {
    let allPlayers, allPlayingFields;
    let eventData; 
    const eventId = req.params.eventId;
    PlayingFieldRepository.getPlayingFields()
        .then(playingFields => {
            allPlayingFields = playingFields;
            return PlayerRepository.getPlayers();
        })
        .then(players =>{
            allPlayers = players;
            return EventRepository.getEventById(eventId);
        })
        .then(event => {
            eventData = event;
            res.render('pages/event/form', {
                event: eventData,
                allPlayers: allPlayers,
                allPlayingFields: allPlayingFields,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły eventu',
                formAction: '',
                navLocation: 'event'
            });
        });
}

exports.addEvent = (req, res, next) => {
    const eventData = {...req.body };
    EventRepository.createEvent(eventData)
        .then( result => {
            res.redirect('/events');
        });
};

exports.updateEvent = (req, res, next) => {
    const eventId = req.body._id
    const eventData = { ...req.body };
    EventRepository.updateEvent(eventId, eventData)
        .then( result => {
            res.redirect('/events');
        });
};

exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    EventRepository.deleteEvent(eventId)
        .then( ()=> {
            res.redirect('/events');
        });
};