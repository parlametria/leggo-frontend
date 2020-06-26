const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const forceSsl = require('force-ssl-heroku')

const app = express()

app.use(forceSsl)

app.get('/:interesse', (req, res) => {
  let url = process.env.APP_URL || 'https://leggo.parlametria.org'
  url = url + '/#/' + req.params.interesse
  res.redirect(url)
})

app.use(serveStatic(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server running on ${port}`))
