import { TIME_UNIT } from './enums'

export default class Event {
    constructor (timeTrigger, callback, timeUnit) {
        this.timeTrigger = timeTrigger
        this.timeUnit = timeUnit || TIME_UNIT.SECOND
        this.callback = callback
        this.triggered = false
    }
}