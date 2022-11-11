const {UserModel} = require("../models");

async function login(username, password) {
    const user = await UserModel.findOne({ username, password });
    return user != null
}
async function isAdmin(username) {
    if (username != null)
    {
        const user = (await UserModel.find({username}))[0]
        if (user.role == "Administrator")
            return true
        else
            return false
    }
    else
        return false
}
async function isLoggedIn() { 
    if (req.session.username != null)
        return true
    else
        return false
}

module.exports = { login, isAdmin, isLoggedIn } // register }