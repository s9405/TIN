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
                pageTitle: req.__('event.form.edit.pageTitle'),
                btnLabel: req.__('event.form.edit.btnLabel'),
                alertMessage: req.__('event.form.edit.alertMessage'),
                formAction: '/events/edit',
                navLocation: 'event',
                formMode: '',
                validationErrors: []
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
                pageTitle: req.__('event.form.add.pageTitle'),
                alertMessage: req.__('event.form.add.alertMessage'),
                btnLabel: req.__('event.form.add.btnLabel'),
                formAction: '/events/add',
                navLocation: 'event',
                validationErrors: []
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
                pageTitle: req.__('event.form.details'),
                formAction: '',
                navLocation: 'event',
                validationErrors: []
            });
        });
}

exports.addEvent = (req, res, next) => {
    const eventData = {...req.body };
    let allPlayers, allPlayingFields;
    EventRepository.createEvent(eventData, req)
        .then( result => {
            res.redirect('/events');
        })
        .catch(err => {
            if(eventData.endTime != ''){
                eventData.endTime = new Date(eventData.endTime);
            }
            if(eventData.beginTime != ''){
                eventData.beginTime = new Date(eventData.beginTime);
            }
            PlayerRepository.getPlayers()
            .then(players =>{
                allPlayers = players;
                return PlayingFieldRepository.getPlayingFields();
            })
            .then(playingFields => {
                allPlayingFields = playingFields;
                res.render('pages/event/form', {
                    event: eventData,
                    allPlayers: allPlayers,
                    allPlayingFields: allPlayingFields,
                    pageTitle: req.__('player.form.add.pageTitle'),
                    formMode: 'createNewErr',
                    btnLabel: req.__('player.form.add.btnLabel'),
                    alertMessage: req.__('event.form.add.alertMessage'),
                    formAction: '/events/add',
                    navLocation: 'event',
                    validationErrors: err.details
                });
            });
        });
};

exports.updateEvent = (req, res, next) => {
    let allPlayers, allPlayingFields;
    let eventD;
    const eventId = req.body._id
    const eventData = { ...req.body };
    EventRepository.updateEvent(eventId, eventData, req)
        .then( result => {
            res.redirect('/events');
        })
        .catch(err => {
            EventRepository.getEventById(eventId)
            .then(event =>{
                eventD = event;
                return PlayerRepository.getPlayers(); 
            })
            .then(players =>{
                allPlayers = players;
                return PlayingFieldRepository.getPlayingFields();
            })
            .then(playingFields => {
                allPlayingFields = playingFields;
                res.render('pages/event/form', {
                    event: eventD,
                    allPlayers: allPlayers,
                    allPlayingFields: allPlayingFields,
                    formMode: 'edit',
                    pageTitle: req.__('event.form.edit.pageTitle'),
                    btnLabel: req.__('event.form.edit.btnLabel'),
                    alertMessage: req.__('event.form.edit.alertMessage'),
                    formAction: '/events/edit',
                    navLocation: 'event',
                    validationErrors: err.details
                });
            });
        });
};

exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    EventRepository.deleteEvent(eventId)
        .then( ()=> {
            res.redirect('/events');
        });
};