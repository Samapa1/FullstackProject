const router = require('express').Router()
const { User } = require('../models')
const { Book } = require('../models')
const { sequelize } = require('../util/db')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
        {
            model: Book,
            attributes: ['title', 'author'],
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
    
        res.json(user)
    } catch (err) {
        console.log(err)
        if (err.errors[0].path === 'username') {
            res.status(400).json({ message: "username already in use" })
        }
        // throw err
    }

})

router.put('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) { 
        console.log(user.id)
        console.log(user.borrowed_books)
        await user.sequelize.query(
            `UPDATE Users SET borrowed_books = ARRAY[1, 1] WHERE id= ${user.id}`
            );
        await user.save()
        res.json(user)
   
    }
  })

router.get('/:id', async (req, res) => {

    const user = await User.findByPk(req.params.id, { 
        attributes: { } ,
        include: [
            {
                model: Book,
                attributes: ['title', 'author']
              }
            ]
    })

    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router