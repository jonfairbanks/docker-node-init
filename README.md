# docker-node-init

PM2 is a very popular application used to launch Node.js (and other scripts) in a production fashion. 

Although PM2 does a good job of launching process on bare-metal, it is not ideal in a Docker environment. 

## What's wrong with PM2 & Docker?

When a Node.js process exits, it exits with a particular event:

- SIGINT
- SIGTERM
- SIGKILL

If the Node script is started with `npm start` for example, these events may not be properly exposed to the parent process(es) allowing error handling to take place. 

Similar scenarios may take place when using `pm2 start index.js` within a Docker container. If a `SIG*` event is thrown, the event may be swallowed by `npm` or `pm2`.

[PM2 does offer a method for Docker](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/), however there's a better way. Read on!

## So what should I use instead?

[tini](https://github.com/krallin/tini)

From the repo:

> All Tini does is spawn a single child (Tini is meant to be run in a container), and wait for it to exit all the while reaping zombies and performing signal forwarding.

## Example Dockerfiles

In this repository are a few sample Dockerfiles --
- [Dockerfile]():
- [Dockerfile-pm2]():
- [Dockerfile-tini]():

## Using the App

To test how a theoretical Node.js app runs in these scenarios, this app exposes a few endpoints to test with:
- [/](#): Landing page
- [/sigint](#): Sends the app process a `SIGINT` signal after X seconds
- [/sigkill](#): Sends the app process a `SIGKILL` signal after X seconds
- [/sigterm](#): Sends the app process a `SIGTERM` signal after X seconds

## Configuration Options

The following process.env options are supported:

- `PORT` - Override the application port (Default: 3000)
- `SECS` - Override seconds before process signals are sent (Default: 3)

## Resources

[PM2 GitHub](https://github.com/Unitech/pm2)
[PM2 Docs](https://pm2.keymetrics.io/docs/usage/quick-start)
[Process Signal Events](https://nodejs.org/api/process.html#process_signal_events)
[Process Exit Codes](https://nodejs.org/api/process.html#process_process_exit_code)
[Tini](https://github.com/krallin/tini)
[Node.js & Docker Best Practices](https://github.com/BretFisher/dockercon19)