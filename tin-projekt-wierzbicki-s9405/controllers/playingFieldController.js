const PlayingFieldRepository = require('../repository/mysql2/PlayingFieldRepository');

exports.showPlayingFieldList = (req, res, next) => {
    PlayingFieldRepository.getPlayingFields()
        .then( playingFields => {
            res.render('pages/playingfield/list', {
                playingFields: playingFields,
                navLocation: 'playingField'
            });
        });
}

exports.showAddPlayingFieldForm = (req, res, next) => {
    res.render('pages/playingfield/form', {
        pf: {},
        pageTitle: 'Nowy obiekt sportowy',
        formMode: 'createNew',
        btnLabel: 'Dodaj obiekt sportowy',
        formAction: '/playingfields/add',
        navLocation: 'playingField'
    });
}

exports.showEditPlayingFieldForm = (req, res, next) => {
    const pfId = req.params.pfId;
    PlayingFieldRepository.getPlayingFieldById(pfId)
        .then(pf => {
            res.render('pages/playingfield/form', {
                pf: pf,
                formMode: 'edit',
                pageTitle: 'Edycja obiektu sportowego',
                btnLabel: 'Edytuj obiekt sportowy',
                formAction: '/playingfields/edit',
                navLocation: 'playingField'
            });
        });
};

exports.showPlayingFieldDetails = (req, res, next) => {
    const pfId = req.params.pfId;
    PlayingFieldRepository.getPlayingFieldById(pfId)
        .then(pf => {
            res.render('pages/playingfield/form', {
                pf: pf,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły obiektu sportowego',
                formAction: '',
                navLocation: 'playingField'
            });
        });
}

exports.addPlayingField = (req, res, next) => {
    const pfData = {...req.body};
    PlayingFieldRepository.createPlayingField(pfData)
        .then( result => {
            res.redirect('/playingfields');
        });
};

exports.updatePlayingField = (req, res, next) => {
    const pfId = req.body._id;
    const pfData = { ...req.body };
    PlayingFieldRepository.updatePlayingField(pfId, pfData)
        .then( result => {
            res.redirect('/playingfields');
        });
};

exports.deletePlayingField = (req, res, next) => {
    const pfId = req.params.pfId;
    PlayingFieldRepository.deletePlayingField(pfId)
        .then( () =>{
            res.redirect('/playingfields');
        });
};