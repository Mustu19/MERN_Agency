const User = require("../models/user-model");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to the controller home app!");
    } catch (error) {
        console.log('error');
    }
}

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ msg: 'email already exists' })
        }

        // const saltRound = 10
        // const hash_password = await bcrypt.hash(password, saltRound)
        // const userCreated = await User.create({ username, email, phone, password: hash_password})

        const userCreated = await User.create({ username, email, phone, password})

        res.status(201).json({ message: userCreated })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { home, register }