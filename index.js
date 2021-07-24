const express = require('express')
const process = require('process')

process.stdin.resume();

const app  = express()
const port = process.env.PORT || 3000
const secs = process.env.SECS || 2
const ms   = secs * 1000

app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
	console.log(`/ accessed @ ${new Date()}`)
	res.render('home')
})

app.get('/sigint', (_req, res) => {
	console.log(`/sigint accessed @ ${new Date()}`)
	setTimeout(function () { process.kill(process.pid, 'SIGINT') }, ms);
	res.send(`The app process will be interrupted in ${secs} seconds...`)
})

app.get('/sigkill', (_req, res) => {
	console.log(`/sigkill accessed @ ${new Date()}`)
	setTimeout(function () { process.kill(process.pid, 'SIGKILL') }, ms);
	res.send(`The app process will be killed in ${secs} seconds...`)
})

app.get('/sigterm', (_req, res) => {
	console.log(`/sigterm accessed @ ${new Date()}`)
	setTimeout(function () { process.kill(process.pid, 'SIGTERM') }, ms);
	res.send(`The app process will be terminated in ${secs} seconds...`)
})

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

function handle(signal) {
	console.log(`Received ${signal} @ ${new Date()}`);
	process.exitCode
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
