import Chronologie from './js/chronologiejs/index'
import Event from './js/chronologiejs/event.class'
import { TIME_UNIT } from './js/chronologiejs/enums'

window.onload = () => {

    const startBtn = document.querySelector('#start')
    const stopBtn = document.querySelector('#stop')
    const restartBtn = document.querySelector('#restart')

    const chronologie = new Chronologie()

    chronologie.addEvent(new Event( 100, () => { console.log('100 Millisecondes', Date.now())}, TIME_UNIT.MILLISECOND))
    chronologie.addEvent(new Event( 500, () => { console.log('500 Millisecondes', Date.now())}, TIME_UNIT.MILLISECOND))
    chronologie.addEvent(new Event( 2, () => { console.log('2 Secondes', Date.now())}, TIME_UNIT.SECOND))
    chronologie.addEvent(new Event( 2.3, () => { console.log('2.3 Secondes', Date.now())}, TIME_UNIT.SECOND))
    chronologie.addEvent(new Event( 4, () => { console.log('4 Secondes', Date.now())}))
    chronologie.addEvent(new Event( 30, () => { console.log('30 Secondes', Date.now())}, TIME_UNIT.SECOND))
    chronologie.addEvent(new Event( 0.5, () => { console.log('0.5 Minutes', Date.now())}, TIME_UNIT.MINUT))
    chronologie.addEvent(new Event( 1, () => { console.log('1 Minutes', Date.now())}, TIME_UNIT.MINUT))
    chronologie.addEvent(new Event( 1.2, () => { console.log('1.2 Minutes', Date.now())}, TIME_UNIT.MINUT))

    chronologie.updateEventsLog()

    startBtn.addEventListener('click', () => {
        try {
            chronologie.start()
        } catch (e) {
            console.error('start', e)
        }
    })

    stopBtn.addEventListener('click', () => {
        try {
            chronologie.stop()
        } catch (e) {
            console.error('stop', e)
        }
    })

    restartBtn.addEventListener('click', () => {
        try {
            chronologie.restart()
        } catch (e) {
            console.error('stop', e)
        }
    })
}