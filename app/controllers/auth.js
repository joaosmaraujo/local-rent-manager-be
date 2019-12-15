const User = require("../models/users")

async function signIn(req, res) {
    const { username, password } = req.body
    
    if(!username || !password) {
        return res.status(400).send({ error: "Missing arguments." })
    }
    
    try {
        const user = await User.findOne({ username }).select("+password")
        if(!user) {
            return res.status(400).send({ error: "Username not found." })
        } else {
           
            // TO-DO: validate password
            return res.status(200).send({ success: "Successful login." })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
}

module.exports = { signIn }