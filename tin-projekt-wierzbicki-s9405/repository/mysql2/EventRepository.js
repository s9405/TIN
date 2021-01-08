const db = require('../../config/mysql2/db');

exports.getEvents = () => {
    const query = `SELECT e._id as event_id, e.max_number_of_player, e.begin_time, e.end_time, pf._id as playing_field_id, pf.name,
            pf.cloackroom, p._id as player_id, p.firstName, p.lastName, p.email
        FROM Player p, Event e, Playing_field pf
        where p._id = e.Player_id
        and pf._id = e.playing_field_id`
    return db.promise().query(query)
        .then( (results, fields) => {
            const events = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const event = {
                    _id: row.event_id,
                    maxNumberOfPlayer: row.max_number_of_player,
                    beginTime: row.begin_time,
                    endTime: row.end_time,
                    playingField: {
                        _id: row.playing_field_id,
                        name: row.name,
                        cloackroom: row.cloackroom
                    },
                    player: {
                        _id: row.player_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email
                    }
                };
                events.push(event);
            }
            console.log(events);
            return events;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEventById = (eventId) => {
    const query = `SELECT e._id as event_id, e.max_number_of_player, e.begin_time, e.end_time, pf._id as playing_field_id, pf.name,
            pf.cloackroom, p._id as player_id, p.firstName, p.lastName, p.email
        FROM Player p, Event e, Playing_field pf
        where p._id = e.Player_id
        and pf._id = e.playing_field_id
        and e._id = ?`
    return db.promise().query(query, [eventId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }

                const event = {
                    _id: firstRow.event_id,
                    maxNumberOfPlayer: firstRow.max_number_of_player,
                    beginTime: firstRow.begin_time,
                    endTime: firstRow.end_time,
                    playingField: {
                        _id: firstRow.playing_field_id,
                        name: firstRow.name,
                        cloackroom: firstRow.cloackroom
                    },
                    player: {
                        _id: firstRow.player_id,
                        firstName: firstRow.firstName,
                        lastName: firstRow.lastName,
                        email: firstRow.email
                    }
                };
               
            
            console.log(event);
            return event;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.createEvent = (newEventData) => {
    console.log('createEvent');
    console.log(newEventData);
    const sql = 'INSERT into Event (player_id, playing_field_id, max_number_of_player, begin_time, end_time) VALUES (?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [newEventData.playerId, newEventData.playingFieldId,
         newEventData.maxNumberOfPlayer, newEventData.beginTime, newEventData.endTime]);
};

exports.updateEvent = (eventId, eventData) => {
    console.log(eventData);
    const sql = `UPDATE Event set player_id = ?, playing_field_id = ?, max_number_of_player = ?, begin_time = ?, end_time = ? where _id = ?`;
    return db.promise().execute(sql, [eventData.playerId, eventData.playingFieldId, eventData.maxNumberOfPlayer,
         eventData.beginTime, eventData.endTime, eventId]);
};

exports.deleteEvent = (eventId) => {
    const sql = 'DELETE FROM Event where _id = ?'
    return db.promise().execute(sql, [eventId]);
};