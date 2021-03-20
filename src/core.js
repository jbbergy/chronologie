import { TIME_UNIT_VALUE, TIME_UNIT } from './enums'

export default class Chronologie {
    constructor (showLogs) {
        this.events = []
        this.timestampStart = null
        this.timestampEnd = null
        this.showLogs = showLogs ?? false
    }

    log (...messages) {
        if (messages && this.showLogs) console.log(messages.join(' '))
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
        this.log('ChronologieJS : START', this.timestampStart, 'ms')
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
                this.log('ChronologieJS: event', evt.uuid ,' triggered at ', Date.now())
                evt.callback()
                evt.triggered = true
                clearTimeout(evt.timerId)
                if(this.isAllEventsTriggered()) {
                    this.stop()
                }
                clearTimeout(evt.timerId)
            }, this.convertToMillisecondes(evt.timeTrigger, evt.timeUnit))
        })
    }

    isAllEventsTriggered () {
        return this.events.findIndex(evt => evt.triggered === false) === -1
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
        this.log('ChronologieJS: STOP duration ', (this.timestampEnd - this.timestampStart), 'ms')
        this.events.filter(evt => evt.triggered === false)
        ?.forEach(evt => {
            clearTimeout(evt.timerId)
        })

        this.events.filter(evt => evt.triggered === true)
        ?.forEach(evt => {
            evt.triggered = false
        })
    }

    restart () {
        this.stop()
        this.start()
    }
}