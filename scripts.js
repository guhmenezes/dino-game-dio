const dino = document.querySelector('.dino');
const bg = document.querySelector('.bg');
let isJumping = false;
let position = 0;

function handleKeyUp(event){
  if (event.keyCode === 32)
    if (!isJumping) 
    jump();
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

function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 3000 + 100;

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
document.addEventListener('keyup', handleKeyUp)