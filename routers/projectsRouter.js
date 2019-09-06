const router = require('express').Router()
const projectDb = require('../data/helpers/projectModel.js')

router.get('/', (req,res) =>{
    projectDb.get().then(project => {
        res.status(200).json(project);
    }).catch(err => {
        res.status(500).json({ error: "The project information could not be retrieved." })
    })
})
router.post('/', (req, res)=>{
    const projectInfo = req.body;
    projectInfo.name && projectInfo.description ?  db.insert(projectInfo).then(newPost =>{
        res.status(201).json(projectInfo);
    }) : res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    })
})
router.get('/:id', (req, res) =>{
    const {id} = req.params;
    projectDb.get(id)
    .then(project => {
        if(project){
        res.status(200).json(project)
        } else{
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The comment information could not be retrieved." })
    })
})
router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    projectDb.remove(id)
    .then(project =>{
        if(project){
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The post could not be removed" })
    })
})
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    changes.name && changes.description? projectDb.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The project information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
 
    
})


module.exports = router;