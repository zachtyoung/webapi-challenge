const express = require('express')


const server = express();
const projectsRouter = require('./routers/projectsRouter.js')
const actionsRouter = require('./routers/actionsRouter')
server.use(express.json());

server.use('/projects',projectsRouter)
server.use('/actions',actionsRouter)





server.listen(8000, () => console.log('\napi running\n'));