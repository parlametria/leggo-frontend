const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const forceSsl = require('force-ssl-heroku')

const app = express()

app.use(forceSsl)
app.use(serveStatic(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server running on ${port}`))
