const db = require('../../config/mysql2/db');

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

exports.createPlayer = (newPlayerData) => {
    const firstName = newPlayerData.firstName;
    const lastName = newPlayerData.lastName;
    const email = newPlayerData.email;
    const sql = 'INSERT into Player (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
};

exports.updatePlayer = (playerId, playerData) => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;
    const email = playerData.email;
    const sql = `UPDATE Player set firstName = ?, lastName = ?, email = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, playerId]);
};

exports.deletePlayer = (playerId) => {
    const sql1 = 'DELETE FROM Event where player_id = ?'
    const sql2 = 'DELETE FROM Player where _id = ?'

    return db.promise().execute(sql1, [playerId])
        .then(() => {
            return db.promise().execute(sql2, [playerId])
        });
};