import { TIME_UNIT_VALUE, TIME_UNIT_TEXT, TIME_UNIT } from './enums'

export default class Chronologie {
    constructor () {
        this.events = []
        this.timestampStart = null
        this.timestampEnd = null
    }

    addEvent (event) {
        if (!event?.timeTrigger) {
            throw Error('Event format unvalid. Missing \'timeTrigger\' attribute.')
            return
        }

        if (!event?.callback) {
            throw Error('Event format unvalid. Missing \'callback\' function.')
            return
        }

        this.events.push(event)
    }

    start () {
        this.timestampStart = Date.now()
        console.log('ChronologieJS : START', this.timestampStart, 'ms')
        if (this.intervalId) {
            throw Error('You already start the chronologie.')
            return
        }

        if (this.events?.length === 0) {
            throw Error('You have no events set. Use the addEvent() method.')
            return
        }

        this.events.forEach(evt => {
            evt.timerId = setTimeout(() => {
                console.log('ChronologieJS: event', evt.uuid ,' triggered at ', Date.now())
                evt.callback()
                evt.triggered = true
                this.updateEventsLog() 
                clearTimeout(evt.timerId)
            }, this.convertToMillisecondes(evt.timeTrigger, evt.timeUnit))
        })
    }

    updateEventsLog () {
        const eventElement = document.querySelector('#chronologie-events')
        eventElement.innerHTML = ''
        let idx = 0
        this.events?.forEach(evt => {
            const newElement = document.createElement('p')
            newElement.innerHTML = `[${idx}] ${evt.uuid} : ${evt.timeTrigger} ${TIME_UNIT_TEXT[evt.timeUnit]} => ${evt.triggered}`
            eventElement.appendChild(newElement)
            idx++
        })
    }

    convertToMillisecondes (value, unit) {
        let result = value
        switch (unit) {
            case TIME_UNIT.SECOND: 
                result = value * TIME_UNIT_VALUE.SECOND
                break;
            case TIME_UNIT.MINUT: 
                result = (value*60) * TIME_UNIT_VALUE.SECOND
                break;
            case TIME_UNIT.HOUR: 
                result = ((value*60)*60) * TIME_UNIT_VALUE.SECOND
                break;
        }
        return result
    } 

    isStarted () {
        return !!this.intervalId
    }

    stop () {
        this.timestampEnd = Date.now()
        console.log('ChronologieJS: STOP', (this.timestampEnd - this.timestampStart), 'ms')
        this.events.forEach(evt => {
            if (!evt.triggered) {
                clearTimeout(evt.timerId)
            }
            evt.triggered = false
            this.updateEventsLog()
        })
    }

    restart () {
        this.stop()
        this.start()
    }
}