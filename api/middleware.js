//middleware
const actionsModel = require('./actions/actions-model')
const projectsModel = require('./projects/projects-model')

function validateActionId(req, res, next){
    const id = req.params.id;

    actionsModel.get(id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        }else {
            res.status(404).json({
                message: "Project ID not found"
            })
        }
    })
    .catch(err => {
        next(err)
    })

}

function validateProjectId(req, res, next){
    const id = req.params.id;
    projectsModel.get(id)
        .then(project => {
            if(project){
                req.project = project;
                next()
            }else {
                res.status(404).json({
                    message: "Project ID not found"
                })
            }
        })
        .catch( err => {
            next(err)
        })
}

function validateActionBody (req, res, next){
    const actionBody = req.body;

    if (!actionBody.description || !actionBody.notes || !actionBody.project_id){
            res.status(400).json({
                message: "Please provide description and notes and project id for action"
            })
            next()
    }
}

function validateProjectBody(req, res, next){
    const projectBody = req.body;
    if(!projectBody.name || !projectBody.description){
        res.status(400).json({
            message: "Please provide Project name and description"
        })
        next()
    }
}


module.exports = {
    validateActionId,
    validateActionBody,
    validateProjectId,
    validateProjectBody
}