// Write your "actions" router here!
const router = require('express').Router()
const actionsModel = require('./actions-model')
const { validateActionId, validateActionBody} = require('../middleware')

router.get('/', async (req, res, next) => {
   try{
    const actionsList = await actionsModel.get()
    
    res.status(200).json({message: 'Action router running'})
   } catch (err) {
        next(err)
   }
    
})

router.get('/:id', validateActionId, async(req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch(err){
        next(err)
    }
})

router.post('/', validateActionBody, async(req,res, next) =>{
    try {
        const postedAction = await actionsModel.insert(req.body)
        res.status(201).json(postedAction)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateActionBody, async(req, res, next) => {
    try {
        const updatedAction = await actionsModel.update(req.params.id, req.body)
    } catch (err){
        next(err)
    }
})

router.delete('/:id', validateActionId, async(req, res, next) => {
    try {
        const deleted = await actionsModel.remove(req.params.id)
        console.log('deleted =', deleted)
    }catch (err){
        next(err)
    }
})

module.exports = router