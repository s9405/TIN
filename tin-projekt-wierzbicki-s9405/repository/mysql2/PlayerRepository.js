const db = require('../../config/mysql2/db');
const playerSchema = require('../../model/joi/Player');
const updatePlayerSchema = require('../../model/joi/UpdatePlayerSchema');
const authUtil = require('../../util/authUtils');

checkEmailUnique = (req, email, playerId) => {
    let sql, promise;
    if (playerId) {
        sql = `SELECT COUNT(1) as c FROM Player where _id !=? and email = ?`;
        promise = db.promise().query(sql, [playerId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Player where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        const errMessage = req.__('validationMessage.useEmail');
        let err = {};
        if (count > 0){
            err = {
                details: [{
                    path: ['email'],
                    message: errMessage
                }]
            };
        }
        return err;
    });
}

exports.getPlayers = () =>{
    return db.promise().query('SELECT * FROM Player')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.findByEmail = (email) => {
    const query = `SELECT p._id as _id, p.firstName, p.lastName, p.email, p.password FROM Player p
                    WHERE email = ?`;
    return db.promise().query(query, [email])
        .then ((results, fields) =>{
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const player= {
                _id: firstRow._id,
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                email: firstRow.email,
                password: firstRow.password
            }
            return player;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

exports.getPlayerById = (playerId) => {
    const query = `SELECT p._id as _id, p.firstName, p.lastName, p.email,
                 e._id as event_id, e.max_number_of_player, e.begin_time, e.end_time,
                  pf._id as pf_id, pf.name, pf.cloackroom 
                  FROM Player p 
                  left join Event e on p._id = e.player_id 
                  left join Playing_field pf on e.playing_field_id = pf._id 
                  where p._id = ?`
return db.promise().query(query, [playerId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const player = {
            _id: parseInt(playerId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
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
                    playingField: {
                        _id: row.pf_id,
                        name: row.name,
                        cloakroom: row.cloackroom
                    }
                };
                player.events.push(event);
            }
        }
        return player;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createPlayer = (newPlayerData, req) => {
    const vRes = playerSchema.validate(newPlayerData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(req, newPlayerData.email)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newPlayerData.firstName;
                const lastName = newPlayerData.lastName;
                const email = newPlayerData.email;
                const password = authUtil.hashPassword(newPlayerData.password);
                const sql = 'INSERT into Player (firstName, lastName, email, password) VALUES (?, ?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, email, password]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.updatePlayer = (playerId, playerData, req) => {
    const vRes = updatePlayerSchema.validate(playerData, { abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(req, playerData.email, playerId)
    .then(emailErr => {
        if(emailErr.details){
            return Promise.reject(emailErr);
        } else {
            const firstName = playerData.firstName;
            const lastName = playerData.lastName;
            const email = playerData.email;
            const sql = `UPDATE Player set firstName = ?, lastName = ?, email = ? where _id = ?`;
            return db.promise().execute(sql, [firstName, lastName, email, playerId]);
        }
    })
    .catch(err =>{
        return Promise.reject(err);
    });
};

exports.deletePlayer = (playerId) => {
    const sql1 = 'DELETE FROM Event where player_id = ?'
    const sql2 = 'DELETE FROM Player where _id = ?'

    return db.promise().execute(sql1, [playerId])
        .then(() => {
            return db.promise().execute(sql2, [playerId])
        });
};