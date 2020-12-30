exports.showPlayerList = (req, res, next) => {
    res.render('pages/player/list', {navLocation: 'player'});
}

exports.showAddPlayerForm = (req, res, next) => {
    res.render('pages/player/form', {navLocation: 'player'});
}

exports.showPlayerDetails = (req, res, next) => {
    res.render('pages/player/details', {navLocation: 'player'});
}