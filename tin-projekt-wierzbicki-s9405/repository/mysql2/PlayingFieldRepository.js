const db = require('../../config/mysql2/db');
const pfSchema = require('../../model/joi/PlayingField');

checkNameUnique = (req, name, pfId) => {
    let sql, promise;
    if (pfId) {
        sql = `SELECT COUNT(1) as c FROM Playing_field where _id != ? and name = ?`;
        promise = db.promise().query(sql, [pfId, name]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Playing_field where name = ?`;
        promise = db.promise().query(sql, [name]);
    }
    return promise.then( (results, fields) =>{
        const count = results[0][0].c;
        const errMessage = req.__('validationMessage.useName');
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['name'],
                    message: errMessage
                }]
            };
        }
        return err;
    });
}

exports.getPlayingFields = () => {
    return db.promise().query('SELECT * FROM Playing_field')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getPlayingFieldById = (pfId) => {
    const query = `SELECT pf._id as _id, pf.name, pf.adress, pf.cloackroom, e._id as event_id, 
        e.max_number_of_player, e.begin_time, p._id as p_id, e.end_time, p.firstName, p.lastName 
        FROM Playing_field pf
        left join Event e on pf._id = e.playing_field_id
        left join Player p on e.player_id = p._id
        where pf._id = ?`
    return db.promise().query(query, [pfId])
        .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const pf = {
            _id: parseInt(pfId),
            name: firstRow.name,
            adress: firstRow.adress,
            cloackroom: firstRow.cloackroom,
            events: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.event_id) {
                const event = {
                    _id: row.event_id,
                    maxNumberOfPlayer: row.max_number_of_player,
                    beginTime: row.begin_time,
                    endTime: row.end_time,
                    player: {
                        _id: row.p_id,
                        firstName: row.firstName,
                        lastName: row.lastName
                    }
                };
                pf.events.push(event);
            }
        }
        return pf;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createPlayingField = (newPlayingFieldData, req) => {
    const vRes = pfSchema.validate(newPlayingFieldData, {abortEarly: false});
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNameUnique(req, newPlayingFieldData.name)
        .then(nameErr => {
            if (nameErr.details) {
                return Promise.reject(nameErr);
            } else {
                const name = newPlayingFieldData.name;
                const adress = newPlayingFieldData.adress;
                const cloackroom = newPlayingFieldData.cloackroom;
                const sql = 'INSERT into Playing_field (name, adress, cloackroom) VALUES (?, ?, ?)'
                return db.promise().execute(sql, [name, adress, cloackroom]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.updatePlayingField = (playingFieldId, playingFieldData, req) => {
    const vRes = pfSchema.validate(playingFieldData, {abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNameUnique(req, playingFieldData.name, playingFieldId)
        .then(nameErr => {
            if (nameErr.details) {
                return Promise.reject(nameErr);
            } else {
                const name = playingFieldData.name;
                const adress = playingFieldData.adress;
                const cloackroom = playingFieldData.cloackroom;
                const sql = `UPDATE Playing_field set name = ?, adress = ?, cloackroom = ? where _id = ?`;
                return db.promise().execute(sql, [name, adress, cloackroom, playingFieldId]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deletePlayingField = (playingFieldId) => {
    const sql1 = 'DELETE FROM Event where playing_field_id = ?'
    const sql2 = 'DELETE FROM Playing_field where _id = ?'

    return db.promise().execute(sql1, [playingFieldId])
        .then(() => {
            return db.promise().execute(sql2, [playingFieldId])
        });
};