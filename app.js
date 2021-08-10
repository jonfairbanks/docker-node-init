const express = require('express')
const process = require('process')

process.stdin.resume()

const app = express()
const secs = process.env.SECS || 2
const ms = secs * 1000

app.set('view engine', 'ejs')

app.get('/', (_req, res) => {
  console.log(`/ accessed @ ${new Date()}`)
  res.render('home')
})

app.get('/sigint', (_req, res) => {
  console.log(`/sigint accessed @ ${new Date()}`)
  setTimeout(function () {
    process.kill(process.pid, 'SIGINT')
  }, ms)
  res.render('sigint', { secs: secs })
})

app.get('/sigterm', (_req, res) => {
  console.log(`/sigterm accessed @ ${new Date()}`)
  setTimeout(function () {
    process.kill(process.pid, 'SIGTERM')
  }, ms)
  res.render('sigterm', { secs: secs })
})

app.get('/sigkill', (_req, res) => {
  console.log(`/sigkill accessed @ ${new Date()}`)
  setTimeout(function () {
    process.kill(process.pid, 'SIGKILL')
  }, ms)
  res.render('sigkill', { secs: secs })
})

function handle(signal) {
  console.log(`Received ${signal} @ ${new Date()}`)
  if (signal === 'SIGINT') {
    process.exit(0)
  } else if (signal === 'SIGTERM') {
    process.exit(0)
  }
}

process.on('SIGINT', handle)
process.on('SIGTERM', handle)

module.exports = app
