const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const server = restify.createServer()
const File = require('fs')
server.use(restify.plugins.bodyParser({
    mapParams: true
}))
const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.post('/save/log/', (req, res, next) => {
    let data = req.params.name + ";" + req.params.email + ";" + req.params.phone + ";" + req.params.message + "\n"
    File.appendFileSync('base.csv', data)
    res.json({ hasError: false, message: 'salvo com sucesso' })
    return next()
})



server.listen(8000, function () {
    console.log('listening on http://localhost:8000')
})