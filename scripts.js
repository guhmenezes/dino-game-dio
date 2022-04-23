const dino = document.querySelector('.dino');
const bg = document.querySelector('.bg');
const pontuacao = document.querySelector('.pontuacao');
let isJumping = false;
let position = 0;

function placar(){
  if (+pontuacao.textContent === 0){
  var count = setInterval(() => {
    count += 8; 
    console.log(count)
    pontuacao.textContent = '00000'+count
  },1000)
  } else if (count > 100){
    var count = setInterval(() => {
      count += 16; 
      console.log(count)
      pontuacao.textContent = count
    },1000)
  }

}

function handleJump(event){
  console.log(event)
  if (event.keyCode === 32 || event.type === 'click'){
    if (!isJumping) 
    jump();
  }
  else if (event.keyCode === 16 || event.type ==='double click'){
    superJump();
  }
}

function jump(){
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150){
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 40)
    } else {
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 10)
}

function superJump(){
  // isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 300){
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 40)
    } else {
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 10)
}

function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 750;
  let randomTime = Math.random() * 3000 + 800;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  bg.appendChild(cactus);

  let leftInterval = setInterval(() => {  
    if (cactusPosition < -60){
      clearInterval(leftInterval);
      bg.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 50 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo </h1>'
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20)

  setTimeout(createCactus, randomTime);

}

createCactus();
placar();
// document.addEventListener('keyup', handleJump);
// document.addEventListener('click', handleJump);
['click', 'keyup'].forEach(evt => document.addEventListener(evt, handleJump))