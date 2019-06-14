# MultiLife.live 
[![CircleCI](https://circleci.com/gh/jmercha/multilife/tree/master.svg?style=svg)](https://circleci.com/gh/jmercha/multilife/tree/master)

An experiment in realtime cellular automata. 

Basically, an interactive multiplayer digital lava lamp.

## Dependencies

* Node.js v12
* A computer with an operating system.

## Design

The frontend is implemented in React, using Redux to manage the client-side state. 

The game itself is rendered using a `<canvas>`.

Game state is managed server side, and events are pushed live between clients and the server using a websocket.

## Running

* `yarn dev-server` - builds and starts the server
* `yarn dev-client` - builds and starts the frontend