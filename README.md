# ChronologieJS

This library allow you to trigger functions at a specified time. Like a super setTimeout manager.  
My idea was to make a web tecnologies based cartoon.

## Installation  

```sh
npm i chronologiejs
```

## Usage

```js
import { Chronologie, ChronologieEvent } from 'chronologiejs'

// declare ChronologieJS
const chronologie = new Chronologie()

// declare events you want to trigger
const event1 = new ChronologieEvent( 100, callbackFunction1)
const event2 = new ChronologieEvent( 1500, callbackFunction2)

// add events to the event pool
chronologie.addEvent(event1)
chronologie.addEvent(event2)

// start processing the events pool
chronologie.start()

// stop processing the events pool
chronologie.start()

// stop and start processing the events pool
chronologie.restart()

```

## Classes
`Chronologie` : The core of the library  
`ChronologieEvent` : Event object used to declare your event. Parameters are the timer in milliseconds and the callback function

## Methods  
`addEvent` : Add an event declared with `ChronologieEvent` to the event pool  
`start` : start processing the event pool  
`stop` : stop processing the event pool  
`restart` : stop and start processing the event pool  

## Event pool processing
All your declared events have a callback function. When you call the `start` method, the pool will be processed. when the time you configured in an event is reached, the callback function is triggered.

## Callback function
It's a function made by yourself. In this function you can do what you need : manipulate the DOM, play a sound, etc
```js
function playASound() {
  const mediaElement = document.querySelector('#sound-element')
  mediaElement.volume = 0.30
  mediaElement.currentTime = 0
  mediaElement.play()
}

const myEvent = new ChronologieEvent( 1500, playASound)

chronologie.addEvent(myEvent)

```
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details