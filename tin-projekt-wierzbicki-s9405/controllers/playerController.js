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
        pageTitle: 'Nowy gracz',
        formMode: 'createNew',
        btnLabel: 'Dodaj gracza',
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
                pageTitle: 'Edycja gracza',
                btnLabel: 'Edytuj gracza',
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
                pageTitle: 'Szczegóły gracza',
                formAction: '',
                navLocation: 'player',
                validationErrors: []
            });
        });
}

exports.addPlayer = (req, res, next) => {
    const playerData = {...req.body };
    PlayerRepository.createPlayer(playerData)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('pages/player/form', {
                player: playerData,
                pageTitle: 'Dodawanie gracza',
                formMode: 'createNew',
                btnLabel: 'Dodaj gracza',
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.updatePlayer = (req, res, next) => {
    const playerId = req.body._id
    const playerData = { ...req.body };
    PlayerRepository.updatePlayer(playerId, playerData)
        .then( result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('pages/player/form', {
                player: playerData,
                formMode: 'edit',
                pageTitle: 'Edycja gracza',
                btnLabel: 'Edytuj gracza',
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