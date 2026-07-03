const User = require("../models/user_model")
const bcrypt = require('bcryptjs')

async function login(req, res) {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            res.json({message: 'User does not exists'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            res.json({
                message: 'Login success',
                email: user.email,
                name: user.name
            })
        }
        res.json({message: 'Invalid credentials'})
    }catch(error) {
        res.json({error})
    }
}

async function register(req, res) {
    const {name, email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).json({message: 'This email is already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({name, email, password: hashedPassword})
        res.json({
            message: 'User registerd successfully',
            user
        })
    }catch(error) {
        res.json({error})
    }
}

module.exports = {login, register}