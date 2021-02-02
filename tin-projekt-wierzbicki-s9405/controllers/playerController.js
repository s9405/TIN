const PlayerRepository = require('../repository/mysql2/PlayerRepository');

exports.showPlayerList = (req, res, next) => {
    PlayerRepository.getPlayers()
    .then( players => {
        res.render('pages/player/list', {
            players: players,
            navLocation: 'player'
        });
    });
}

exports.showAddPlayerForm = (req, res, next) => {
    res.render('pages/player/form', {
        player: {},
        pageTitle: req.__('player.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('player.form.add.btnLabel'),
        alertMessage: req.__('player.form.add.alertMessage'),
        formAction: '/players/add',
        navLocation: 'player',
        validationErrors: []
    });
}

exports.showEditPlayerForm = (req, res, next) => {
    const playerId = req.params.playerId;
    PlayerRepository.getPlayerById(playerId)
        .then(player => {
            res.render('pages/player/form', {
                player: player,
                formMode: 'edit',
                pageTitle: req.__('player.form.edit.pageTitle'),
                btnLabel: req.__('player.form.edit.btnLabel'),
                alertMessage: req.__('player.form.edit.alertMessage'),
                formAction: '/players/edit',
                navLocation: 'player',
                validationErrors: []
            });
        });
}

exports.showPlayerDetails = (req, res, next) => {
    const playerId = req.params.playerId;
    PlayerRepository.getPlayerById(playerId)
        .then(player => {
            res.render('pages/player/form', {
                player: player,
                formMode: 'showDetails',
                pageTitle: req.__('player.form.details'),
                formAction: '',
                navLocation: 'player',
                validationErrors: []
            });
        });
}

exports.addPlayer = (req, res, next) => {
    const playerData = {...req.body };
    PlayerRepository.createPlayer(playerData, req)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('pages/player/form', {
                player: playerData,
                pageTitle: req.__('player.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('player.form.add.btnLabel'),
                alertMessage: req.__('player.form.add.alertMessage'),
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.updatePlayer = (req, res, next) => {
    const playerId = req.body._id
    const playerData = { ...req.body };
    PlayerRepository.updatePlayer(playerId, playerData, req)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('pages/player/form', {
                player: playerData,
                formMode: 'edit',
                pageTitle: req.__('player.form.edit.pageTitle'),
                btnLabel: req.__('player.form.edit.btnLabel'),
                alertMessage: req.__('player.form.edit.alertMessage'),
                formAction: '/players/edit',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.deletePlayer = (req, res, next) => {
    const playerId = req.params.playerId;
    PlayerRepository.deletePlayer(playerId)
        .then( ()=> {
            res.redirect('/players');
        });
};