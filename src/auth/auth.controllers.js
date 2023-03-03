const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
    findUserByEmail(email)
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        } else {
            return false
        }
    }
    catch (err) {
        return false
    }
}

checkUsersCredentials('sahid.kick@academlo.com','root')
.then(data=>console.log(data))
.catch(err=>console.log(err))

module.exports = checkUsersCredentials