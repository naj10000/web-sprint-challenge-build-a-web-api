// Write your "actions" router here!
const router = require('express').Router()
const actionsModel = require('./actions-model')

router.get('/', (req, res) => {
    res.status(200).json({message: 'Action router running'})
})

module.exports = router