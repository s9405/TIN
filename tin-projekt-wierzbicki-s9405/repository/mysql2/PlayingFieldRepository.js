const db = require('../../config/mysql2/db');

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

exports.getPlayingFieldById = (playingFieldId) => {
    const query = `SELECT pf._id as _id, pf.name, pf.adress, pf.cloackroom, e._id as event_id, 
        e.max_number_of_player, e.begin_time, pf._id as pf_id, e.end_time, p.firstName, p.lastName 
        FROM Playing_field pf, Player p, Event e 
        where pf._id = e.playing_field_id
        and p._id = e.player_id 
        and pf._id = ?`
    return db.promise().query(query, [playingFieldId])
        .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const playingField = {
            _id: parseInt(playingFieldId),
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
                playingField.events.push(event);
            }
        }
        return playingField;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createPlayingField = (newPlayingFieldData) => {
    const name = newPlayingFieldData.name;
    const adress = newPlayingFieldData.adress;
    const cloackroom = newPlayingFieldData.cloackroom;
    const sql = 'INSERT into Playing_field (name, adress, cloackroom) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [name, adress, cloackroom]);

};

exports.updatePlayingField = (playingFieldId, playingFieldData) => {
    const name = playingFieldData.name;
    const adress = playingFieldData.adress;
    const cloackroom = playingFieldData.cloackroom;
    const sql = `UPDATE Playing_field set name = ?, adress = ?, cloackroom = ? where _id = ?`;
    return db.promise().execute(sql, [name, adress, cloackroom, playingFieldId]);
};

exports.deletePlayingField = (playingFieldId) => {
    const sql1 = 'DELETE FROM Event where playing_field_id = ?'
    const sql2 = 'DELETE FROM Playing_field where _id = ?'

    return db.promise().execute(sql1, [playingFieldId])
        .then(() => {
            return db.promise().execute(sql2, [playingFieldId])
        });
};