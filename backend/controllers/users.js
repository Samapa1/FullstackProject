const router = require('express').Router()
const { User } = require('../models')
const { Book } = require('../models')
const { Reservation } = require('../models')
const bcrypt = require('bcrypt')
const { tokenExtractor } = require('../utils/middleware')


const validPassword = (password) => {
    if (password.length < 8) {
      return false
    }

    return ([/\d/.test(password)])
  }

router.get('/', tokenExtractor, async (req, res) => {
    if (req.user.admin !== true) {
        return res.status(403).json({error: 'Only admins are allowed to view users.'})
    }

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
        if (err.errors[0].path === 'username' && err.errors[0].type === 'unique violation') {
            res.status(400).json({ message: "username already in use" })
        }
        else {
            res.status(400).json({ message: err.errors[0].message })
        }  
    }

})

router.post('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const saltRounds = 10
    if (user.id !== req.user.id) {
        res.status(403).end()
    }

    const passwordCorrect = await bcrypt.compare(req.body.oldPassword, user.passwordHash)

    if (!passwordCorrect) {
        return res.status(401).json({ message: 'wrong password' })
    }

    if (!validPassword(req.body.newPassword)) {
        return res.status(400).json({ message: 'new password is invalid' })
    }

    try {

        user.name = req.body.name
        user.email = req.body.email
        user.passwordHash = await bcrypt.hash(req.body.newPassword, saltRounds)
        await user.save()
        res.json(user)
    }
    catch(err) {
        console.log(err.errors[0].message)
        res.status(400).json({message: err.errors[0].message })
    }
    
  })

router.get('/:id', tokenExtractor, async (req, res) => {
  
    if (Number(req.params.id) !== Number(req.user.id)) {
        res.status(403).end()
    }
    
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
        res.send({
            id: user.id,
            username: user.username, 
            name: user.name,
            email: user.email,
            admin: user.admin,
            books: user.books,
            reservedBooks: user.reservedBooks 

        })
    } else {
        res.status(404).end()
    }
})

module.exports = router