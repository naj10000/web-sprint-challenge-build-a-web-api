const express = require('express');
const server = express();
const morgan = require('morgan')
const helmet = require('helmet')
const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(morgan('combined'))
server.use('/api/actions',actionsRouter);
server.use('/api/projects',projectsRouter)
server.use((err, req, res, next) =>{
    console.log(res.status(500).json({
        message: "something went wrong"
    }))
})
server.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server RUnning'
    })
})

module.exports = server;
