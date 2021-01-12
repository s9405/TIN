const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    PlayerRepository.findByEmail(email)
        .then(player => {
            if (!player){
                res.render('index', {
                    nacLocation: '',
                    loginError : "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, player.password) === true) {
                req.session.loggedUser = player;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err =>{
            console.log.apply(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}