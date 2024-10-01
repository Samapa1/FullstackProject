const router = require('express').Router()
const { User } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create({...req.body})
    res.json(user)
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

module.exports = router