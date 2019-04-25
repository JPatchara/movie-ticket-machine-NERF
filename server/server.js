const express = require('express')
const next = require('next')
var cors = require('cors')
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//----app starting handle----//
nextApp.prepare().then(() => {
    const app = express()
    
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', require('./api.js'))

    app.get('*', (req, res) => {
        return handle(req, res)
    })
    
    app.listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:${PORT}')
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})