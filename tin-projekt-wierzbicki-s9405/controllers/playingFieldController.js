exports.showPlayingFieldList = (req, res, next) => {
    res.render('pages/playingfield/list', {navLocation: 'playingField'});
}

exports.showAddPlayingFieldForm = (req, res, next) => {
    res.render('pages/playingfield/form', {navLocation: 'playingField'});
}

exports.showPlayingFieldDetails = (req, res, next) => {
    res.render('pages/playingfield/details', {navLocation: 'playingField'});
}