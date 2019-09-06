# MultiLife.live 
[![CircleCI](https://circleci.com/gh/jmercha/multilife/tree/master.svg?style=svg)](https://circleci.com/gh/jmercha/multilife/tree/master)

An experiment in realtime cellular automata. 

See the [dev.to post](https://dev.to/jmercha/conway-s-game-of-life-with-friends-3jj9)

Basically, an interactive multiplayer digital lava lamp.

![](https://media.giphy.com/media/RJtJARbIYPjuoBrX22/giphy.gif)

## MultiLife RGB

MutliLife can rendered to an RGB LED matrix panel using a Raspberry Pi with [multilife-rgb](https://github.com/jmercha/multilife-rgb).

## Dependencies

* Node.js v12
* yarn
* A computer with an operating system.

## Design

The frontend is implemented in React, using Redux to manage the client-side state. 

The game itself is rendered using a `<canvas>`.

Game state is managed server side, and events are pushed live between clients and the server using a websocket

The protocol, models and utility functions are all [isomorphic](https://en.wikipedia.org/wiki/Isomorphic_JavaScript). That is to say, it is code able to be executed on both the server and client side.

## Running

* `yarn dev-server` - builds and starts the server
* `yarn dev-client` - builds and starts the frontend

