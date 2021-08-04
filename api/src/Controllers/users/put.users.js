const { User } = require('../../db');

module.exports = {

    updateUser: async(idUser,newUser) => {

        return await User.findOne({
            where:{
                id: idUser
            }
        })
        .then(async(user) => {
            user.image = newUser.image

            await user.save()
            return user
        })
    }
}
