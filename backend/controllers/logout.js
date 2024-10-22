const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {
    console.log(req.user.id)
    await Session.destroy({
        where: {
        userId: req.user.id
    }})

    res.status(204).end()
    })

module.exports = router