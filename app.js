const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#22e5e5', '#ad0ce8', '#5243f7', '#eb0c5d', '#0ceb65', '#c1e823', '#e85123']
const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
const setTime = (value) => {
    timeEl.innerHTML = `00:${value}`
}
let time = 0
let score = 0

const getRandomNumber = (min,max) => {
    return Math.round(Math.random() * (max-min) + min)
}

const createRandomCircle = () => {
    const circle = document.createElement('div')
    const size = getRandomNumber(5, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.classList.add('circle')
    circle.style.background = `${getRandomColor()}`

    board.append(circle)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

}

const finishGame = () => {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}
const decreaseTime = () => {
    if (time === 0) {
        finishGame()
    }
    else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

const startGame = () => {
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})