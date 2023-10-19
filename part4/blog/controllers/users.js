const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body

    // password menor a 3 caracteres no aplicable
    if( password.length < 3){
        return response.status(403).json({error:'password to short'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username,
        name,
        passwordHash,
    })
   
    const savedUser = await user.save()

    response.status(201).json(savedUser)
    
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)

})

module.exports = usersRouter