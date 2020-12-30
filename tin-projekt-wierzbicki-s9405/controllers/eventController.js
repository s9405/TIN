exports.showEvent = (req, res, next) => {
    res.render('pages/event/event', {navLocation: 'event'});
}

exports.showAddEventForm = (req, res, next) => {
    res.render('pages/event/form', {navLocation: 'event'});
}

exports.showEventDetails = (req, res, next) => {
    res.render('pages/event/details', {navLocation: 'event'});
}