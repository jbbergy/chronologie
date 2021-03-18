import { TIME_UNIT_VALUE, TIME_UNIT_TEXT, TIME_UNIT } from './enums'

export default class Chronologie {
    constructor (verbose = false) {
        this.intervalId = null
        this.intervalTime = 40
        this.elapsedTime = 0
        this.events = []
        this.verbose = verbose
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

        event.triggered = false
        this.events.push(event)
    }

    start () {
        this.timestampStart = Date.now()
        console.log('START', this.timestampStart, 'ms')
        if (this.intervalId) {
            throw Error('You already start the chronologie.')
            return
        }

        if (this.events?.length === 0) {
            throw Error('You have no events set. Use the addEvent() method.')
            return
        }

        this.events.forEach(evt => evt.triggered = false)

        this.elapsedTime = 0

        this.intervalId = setInterval(() => {
            this.elapsedTime++
            
            if (this.verbose) console.log('Elapsed Time', this.elapsedTime, ' ms')

            const eventIdx = this.events.findIndex(evt => {
                return (
                    this.convertToMillisecondes(evt.timeTrigger, evt.timeUnit) <= this.elapsedTime
                    && evt.triggered === false
                )
            })

            const event = this.events[eventIdx]

            if (event) {
                event.callback()
                event.triggered = true
            }
        }, 1)
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
        console.log('STOP', (this.timestampEnd - this.timestampStart), 'ms')
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    restart () {
        this.stop()
        this.start()
    }
}