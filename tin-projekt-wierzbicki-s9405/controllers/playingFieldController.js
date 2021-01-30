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
        pageTitle: req.__('pf.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('pf.form.add.btnLabel'),
        alertMessage: req.__('pf.form.add.alertMessage'),
        formAction: '/playingfields/add',
        navLocation: 'playingField',
        validationErrors: []
    });
}

exports.showEditPlayingFieldForm = (req, res, next) => {
    const pfId = req.params.pfId;
    PlayingFieldRepository.getPlayingFieldById(pfId)
        .then(pf => {
            res.render('pages/playingfield/form', {
                pf: pf,
                formMode: 'edit',
                pageTitle: req.__('pf.form.edit.pageTitle'),
                btnLabel: req.__('pf.form.edit.btnLabel'),
                alertMessage: req.__('pf.form.edit.alertMessage'),
                formAction: '/playingfields/edit',
                navLocation: 'playingField',
                validationErrors: []
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
                pageTitle: req.__('pf.form.details'),
                formAction: '',
                navLocation: 'playingField',
                validationErrors: []
            });
        });
}

exports.addPlayingField = (req, res, next) => {
    const pfData = {...req.body};
    PlayingFieldRepository.createPlayingField(pfData)
        .then( result => {
            res.redirect('/playingfields');
        })
        .catch(err =>{
            res.render('pages/playingfield/form', {
                pf: pfData,
                pageTitle: req.__('pf.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('pf.form.add.btnLabel'),
                formAction: '/playingfields/add',
                navLocation: 'playingField',
                validationErrors: err.details
            });
        });
};

exports.updatePlayingField = (req, res, next) => {
    const pfId = req.body._id;
    const pfData = { ...req.body };
    PlayingFieldRepository.updatePlayingField(pfId, pfData)
        .then( result => {
            res.redirect('/playingfields');
        })
        .catch(err => {
            res.render('pages/playingfield/form', {
                pf: pfData,
                formMode: 'edit',
                pageTitle: req.__('pf.form.edit.pageTitle'),
                btnLabel: req.__('pf.form.edit.btnLabel'),
                formAction: '/playingfields/edit',
                navLocation: 'playingField',
                validationErrors: err.details
            });
        });
};

exports.deletePlayingField = (req, res, next) => {
    const pfId = req.params.pfId;
    PlayingFieldRepository.deletePlayingField(pfId)
        .then( () =>{
            res.redirect('/playingfields');
        });
};