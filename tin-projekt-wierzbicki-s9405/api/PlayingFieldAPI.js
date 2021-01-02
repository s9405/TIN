const PlayingFieldRepository = require('../repository/mysql2/PlayingFieldRepository');

exports.getPlayingField = (req, res, next) => {
    PlayingFieldRepository.getPlayingFields()
    .then(playingFields => {
        res.status(200).json(playingFields);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getPlayingFieldById = (req, res, next) => {
    const playingFieldId = req.params.playingFieldId;
    PlayingFieldRepository.getPlayingFieldById(playingFieldId)
    .then(playingField => {
        if(!playingField) {
            res.status(404).json({
                message: 'Player with id: ' +playingField+' not found' 
            })
        } else {
            res.status(200).json(playingField);
        }
    });
};

exports.createPlayingField = (req, res, next) => {
    PlayingFieldRepository.createPlayingField(req.body)
    .then(newObject => {
        res.status(201).json(newObject);
    })
    .catch(err =>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updatePlayingField = (req, res, next) => {
    const playingFieldId = req.params.playingFieldId;
    PlayingFieldRepository.updatePlayingField(playingFieldId, req.body)
        .then(result => {
           res.status(200).json({message: 'PlayingField updated!', playingField: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deletePlayingField = (req, res, next) => {
    const playingFieldId = req.params.playingFieldId;
    PlayingFieldRepository.deletePlayingField(playingFieldId)
        .then(result => {
            res.status(200).json({message: 'Removed playing field', playingField: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};