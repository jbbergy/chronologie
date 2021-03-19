import Chronologie from './js/chronologiejs/index'
import Event from './js/chronologiejs/event.class'
import { TIME_UNIT } from './js/chronologiejs/enums'

window.onload = () => {

    function backgroundFlash () {
        const element = document.querySelector('.chonologiejs-demo')
        if (element) {
            element.style.backgroundColor = '#125361'
        }
        setTimeout(() => {
            element.style.backgroundColor = '#0a2e36'
        }, 150);
    }

    const startBtn = document.querySelector('#start')
    const stopBtn = document.querySelector('#stop')
    const restartBtn = document.querySelector('#restart')
    const audioElement = document.querySelector('#audio')
    startBtn.disabled = true
    stopBtn.disabled = true
    restartBtn.disabled = true

    const chronologie = new Chronologie()

    console.log('Building events queue')
    const events = []
    for (let index = 6100; index < 107000; index += 770) {
        events.push(new Event( index, backgroundFlash))
    }
    console.log('Events queue builded')

    startBtn.disabled = false
    stopBtn.disabled = false
    restartBtn.disabled = false

    events.forEach(evt => chronologie.addEvent(evt))
    
    startBtn.addEventListener('click', () => {
        try {
            if (audioElement) {
                audioElement.volume = 0.30
                audioElement.currentTime = 0
                audioElement.play()
            }
            chronologie.start()
        } catch (e) {
            console.error('start', e)
        }
    })

    stopBtn.addEventListener('click', () => {
        try {
            if (audioElement) {
                audioElement.pause()
                audioElement.currentTime = 0
            }
            chronologie.stop()
        } catch (e) {
            console.error('stop', e)
        }
    })

    restartBtn.addEventListener('click', () => {
        try {
            if (audioElement) {
                audioElement.pause()
                audioElement.currentTime = 0
                audioElement.play()
            }
            chronologie.restart()
        } catch (e) {
            console.error('restart', e)
        }
    })
}