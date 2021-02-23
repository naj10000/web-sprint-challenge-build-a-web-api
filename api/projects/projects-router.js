// Write your "projects" router here!
const router = require('express').Router();
const projectsModel = require('./projects-model');
const { validateProjectId, validateProjectBody} = require('../middleware')

router.get('/',async (req, res, next) => {
    try {
        const projectsList = await projectsModel.get();
        res.status(200).json(projectsList)
    } catch (err){
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProjectBody, async(req, res, next) => {
    try {
        const newProject = await projectsModel.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateProjectBody, validateProjectId, async(req, res, next) => {
    try {
        const updateProjects = await projectsModel.update(req.params.id, req.body)
        res.status(201).json(updateProjects)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async(req, res, next) => {
    try {
        const deletedProject = await projectsModel.remove(req.params.id)
        if(deletedProject === 1) {
            res.status(204).json(deletedProject)
        }
        next(err)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async(req, res, next) => {
    try {
        const projectActions = await projectsModel.getProjectActions(req.params.id)
        res.status(200).json(projectsModel)
    } catch (err) {
        next(err)
    }
})

module.exports = router
