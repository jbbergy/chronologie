import { TIME_UNIT } from './enums'

export default class Event {
    constructor(timeTrigger, callback, timeUnit) {
        this.timeTrigger = timeTrigger
        this.timeUnit = timeUnit || TIME_UNIT.SECOND
        this.callback = callback
        this.triggered = false
        this.timerId = null
        this.uuid = generateUUID()
    }
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}