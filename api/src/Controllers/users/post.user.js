const { User } = require('../../db');

module.exports = {

    createUser: async(name, lastname, password_virtual, password, email) => {

        return await User.findOrCreate({
            where:{
                email: email
            },
            defaults:{
                name: name,
                lastname: lastname,
                password_virtual: password_virtual,
                password: password
            }
        })
    }
}
