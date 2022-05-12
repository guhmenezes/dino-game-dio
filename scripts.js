const dino = document.querySelector('.dino')
const bg = document.querySelector('.bg')
const pontuacao = document.querySelector('.pontuacao')
const bar = document.querySelector('.progress-bar')
const btnSpecial = document.querySelector('.btn-special')
const lifes = document.querySelectorAll('i')

let progress = 0
let position = 0
let count
let isJumping = false
let isFlying = false
let special = false
let gameOver = false

//BARRA PODER ESPECIAL - OK
function specialBar() {
  special = false
  progress = setInterval(() => {
    if (gameOver === true) {
      clearInterval(progress)
    } else if (progress < 100 && !isFlying) {
      bar.classList.remove('bg-danger')
      bar.classList.remove('bg-warning')
      bar.classList.remove('progress-bar-striped')
      bar.classList.remove('progress-bar-animated')
      progress += 1
      bar.style.width = progress + '%'
    } else if (progress > 98) {
      bar.classList.add('bg-warning')
      bar.classList.add('progress-bar-striped')
      bar.classList.add('progress-bar-animated')
      btnSpecial.classList.add('btn-warning')
    }
    if (progress >= 100) {
      progress = 100
      special = true
    }
    if (isFlying) {
      btnSpecial.classList.remove('btn-warning')
      progress -= 5
      bar.style.width = progress + '%'
    }
    if (progress <= 20 && isFlying) {
      bar.classList.add('bg-danger')
      bar.classList.remove('bg-warning')
    }
  }, 1000)
}

//PONTUACAO - OK
function placar() {
  count = setInterval(() => {
    if (gameOver === true) {
      clearInterval(count)
    } else if (+pontuacao.textContent < 92) {
      let variacao = 8
      count += variacao
      pontuacao.textContent = '0000' + count
    } else if (+pontuacao.textContent < 995) {
      let variacao = 16
      count += variacao
      pontuacao.textContent = '000' + count
    } else if (+pontuacao.textContent < 9987) {
      let variacao = 32
      count += variacao
      pontuacao.textContent = '00' + count
    } else if (+pontuacao.textContent < 99971) {
      let variacao = 64
      count += variacao
      pontuacao.textContent = '0' + count
    } else if (+pontuacao.textContent < 999939) {
      let variacao = 128
      count += variacao
      pontuacao.textContent = count
    } else if (+pontuacao.textContent >= 999939) {
      pontuacao.textContent = '999999'
    }
  }, 1000)
}

//CONTROLES - OK
function handleControls(event) {
  if (
    event.keyCode === 32 ||
    (event.target && event.pointerType) ||
    event.keyCode === 38
  ) {
    if (!isJumping && !isFlying) jump()
  } else if (event.keyCode === 17 && special) {
    fly()
  }
}

function useSpecialButton() {
  if (special) fly()
}

function jumpButton(){
  if (!isJumping && !isFlying) jump()
}

//SALTO - OK
function jump() {
  isJumping = true
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)

      let downInterval = setInterval(() => {
        if (position <= 5) {
          position = 0
          dino.style.bottom = position + 'px'
          clearInterval(downInterval)
          isJumping = false
        } else if (!isFlying) {
          position -= 7
          dino.style.bottom = position + 'px'
        }
      }, 30)
    } else {
      position += 15
      dino.style.bottom = position + 'px'
    }
  }, 30)
}

//ESPECIAL VOO - OK
function fly() {
  isFlying = true
  special = false
  let flyInterval = setInterval(() => {
    position = 80
    dino.style.bottom = position + 'px'
    dino.style.backgroundImage = 'url(images/dino-fly1.png)'

    clearInterval(flyInterval)

    let finishInterval = setInterval(() => {
      dino.style.backgroundImage = 'url(images/dino.png)'
      position = 0
      dino.style.bottom = position + 'px'
      clearInterval(finishInterval)
      isJumping = false
      progress = 0
      special = false
      setTimeout(() => (isFlying = false), 700)
    }, 20100)
  }, 10)
}

//CACTOS - OK
function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 750
  if (window.screen.width <= 800) cactusPosition = window.screen.width - 50
  let randomTime = Math.random() * 3000 + 800

  cactus.classList.add('cactus')
  cactus.style.left = cactusPosition + 'px'
  bg.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition < -10) {
      clearInterval(leftInterval)
      bg.removeChild(cactus)
    } else if (
      cactusPosition > 10 &&
      cactusPosition < 50 &&
      position < 60 &&
      !isFlying
    ) {
      life = document.querySelectorAll('.show')
      if ((cactusPosition = 5)) {
        clearInterval(leftInterval)
        bg.removeChild(cactus)
      }
      if (life.length === 3) {
        lifes[0].classList.remove('show')
      } else if (life.length === 2) {
        lifes[1].classList.remove('show')
      } else {
        gameOver = true
        clearTimeout(newCactus)
        if (
          +window.localStorage.getItem('theBest') <= pontuacao.textContent ||
          window.localStorage.getItem('theBest') === null
        )
          window.localStorage.setItem('theBest', pontuacao.textContent)
        theBest = window.localStorage.getItem('theBest')
        document.body.innerHTML = `
        <div class="game-over-container d-grid mx-auto text-center col-2">
        <h1 class="game-over"> Fim de Jogo </h1>
        <div class="now">
        <p class="h3"> Sua pontuação: </p>
        <span class="pontuacao"> ${pontuacao.textContent}</span>
        </div>
        <div class="best">
        <p class="h5 mt-4"> Sua melhor pontuação: </p>
        <span class="pontuacao"> ${theBest}</span>
        </div>
        <button class="btn btn-dark btn-again mt-5" onclick="window.location.reload()"> Jogar de novo </button>
        </div>
        `
      }
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 40)

  newCactus = setTimeout(createCactus, randomTime)
}

//CORAÇÕES - OK
function createHearts() {
  const hearts = document.createElement('div')
  let heartPositionX = 750
  if (window.screen.width <= 600) heartPositionX = window.screen.width - 50
  let heartPositionY = Math.round(Math.random() * 150 + 15)
  let randomTime = Math.random() * 120000 + 30000

  hearts.classList.add('fa-solid')
  hearts.classList.add('fa-heart')
  hearts.classList.add('hearts')
  hearts.style.left = heartPositionX + 'px'
  hearts.style.bottom = heartPositionY + 'px'
  bg.appendChild(hearts)

  let leftInterval = setInterval(() => {
    let life = document.querySelectorAll('.show')
    if (heartPositionX < -5) {
      clearInterval(leftInterval)
      bg.removeChild(hearts)
    } else if (
      (heartPositionX > 10 &&
        heartPositionX < 50 &&
        heartPositionY < position + 65 &&
        heartPositionY > position - 15) ||
      (heartPositionX < 70 && isFlying)
    ) {
      clearInterval(leftInterval)
      bg.removeChild(hearts)
      if (life.length === 1) {
        lifes[1].classList.add('show')
      } else if (life.length === 2) {
        lifes[0].classList.add('show')
      } else if (life.length > 2) {
        count += 500
      }
    } else {
      heartPositionX -= 10
      hearts.style.left = heartPositionX + 'px'
    }
  }, 40)

  setTimeout(createHearts, randomTime)
}

//PLAY
createCactus()
specialBar()
placar()
setTimeout(createHearts, 45000)
;['click', 'keyup'].forEach(evt =>
  document.addEventListener(evt, handleControls)
)
