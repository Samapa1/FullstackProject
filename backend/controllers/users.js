const router = require('express').Router()
const { User } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')
const bcrypt = require('bcrypt')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
            model: Book,
            attributes: ['title', 'author'],
            },
            {
            model: Reservation
            }
        ]
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const { name, email, username, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const user = await User.create({
            name,  
            email,
            username,
            passwordHash
        })
    
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        if (err.errors[0].path === 'username' && err.errors[0].type === 'unique violation') {
            res.status(400).json({ message: "username already in use" })
        }
    }

})

router.post('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const saltRounds = 10
    if (user.id !== req.user.id) {
        console.log("wrong user")
        res.status(403).end()
    }

    user.name = req.body.name
    user.email = req.body.email
    user.passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    await user.save()
    res.json(user)
   
  })

router.get('/:id', async (req, res) => {

    const user = await User.findByPk(req.params.id, { 
        attributes: { } ,
        include: [
            {
                model: Book,
                attributes: ['title', 'author']
            },
            {
                model: Book,
                as: 'reservedBooks',
                attributes: {}
            },
            ]
    })

    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router