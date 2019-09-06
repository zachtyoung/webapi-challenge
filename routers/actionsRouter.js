const router = require('express').Router()
const actionDb = require('../data/helpers/actionModel.js')
const projectDb = require('../data/helpers/projectModel.js')
router.get('/', (req,res) =>{
    actionDb.get().then(project => {
        res.status(200).json(project);
    }).catch(err => {
        res.status(500).json({ error: "The project information could not be retrieved." })
    })
})
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
    changes.project_id && changes.description? actionDb.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The action information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide a project id and description for the action." })
})
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    actionDb.remove(id)
    .then(action =>{
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The action could not be removed" })
    })
})
router.get('/:id', (req, res) =>{
    const {id} = req.params;
    actionDb.get(id)
    .then(action => {
        if(action){
        res.status(200).json(action)
        } else{
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The comment information could not be retrieved." })
    })
})
// router.post('/', (req, res)=>{
//     const actionInfo = req.body;
//     actionInfo.project_id && actionInfo.description ?  db.insert(actionInfo).then(newPost =>{
//         res.status(201).json(actionInfo);
//     }) : res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
   
//     .catch(err =>{
//         res.status(500).json({ error: "There was an error while saving the project to the database" })
//     })
// })

router.post('/', (req, res)=>{
    const actionInfo = req.body;

if(actionInfo.project_id && actionInfo.description){
    if(projectDb.get(actionInfo.project_id)){
        actionDb.insert(actionInfo).then(newPost =>{
            res.status(201).json(actionInfo);
        }) 
        .catch(err =>{
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
    } else {
        res.status(400).json({message: "A project with that project id does not exist"})
    }
} else{
    res.status(400).json({ errorMessage: "Please provide a project id and description for the project." })
}
  
   
   
})
module.exports = router;