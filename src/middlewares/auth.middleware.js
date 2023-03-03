const { ExtractJwt, Strategy } = require('passport-jwt')

const passport = require('passport')

const { findUserById } = require('../users/users.controllers')

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: 'academlo'
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then(data => {
            if (data) {
                done(null, tokenDecoded)//Usuario existe y es valido
            } else {
                done(null, false, {message: 'Token Incorrect'})//Usuario no existe
            }
        })
        .catch(err => {
            done(err,false)//Error en base de datos
        })
}))


module.exports = passport.authenticate('jwt',{sesion:false})