const dino = document.querySelector('.dino');
const bg = document.querySelector('.bg');
const pontuacao = document.querySelector('.pontuacao');
const bar = document.querySelector('.progress-bar');
const lifes = document.querySelectorAll('i');

let progress = 0;
let position = 0;
let count;
let isJumping = false;
let isFlying = false;
let special = false;

//BARRA PODER ESPECIAL
function specialBar(){
  special = false;
  progress = setInterval(() => {
    if (progress < 100 && !isFlying){
      bar.classList.remove('bg-danger');
      bar.classList.remove('bg-warning');
      bar.classList.remove('progress-bar-striped');
      bar.classList.remove('progress-bar-animated');
      progress += 1;
      bar.style.width = progress + '%'
      // console.log(progress)
    } else if (progress > 98){
      bar.classList.add('bg-warning');
      bar.classList.add('progress-bar-striped')
      bar.classList.add('progress-bar-animated')
    }if (progress >= 100){
      progress = 100
      special = true
    } if (isFlying){
      progress -= 5;
      bar.style.width = progress + '%'
    } if (progress <= 20 && isFlying){
      bar.classList.add('bg-danger');
      bar.classList.remove('bg-warning');
    }

  }, 1000)
}

//PONTUACAO - OK
function placar(){
    count = setInterval(() => {
      if (+pontuacao.textContent < 92){
        let variacao = 8;
        count += variacao;
        pontuacao.textContent = '0000' + count
      } else if (+pontuacao.textContent < 995){
        let variacao = 16;
        count += variacao; 
        pontuacao.textContent = '000' + count
      } else if (+pontuacao.textContent < 9987){
        let variacao = 32;
        count += variacao; 
        pontuacao.textContent = '00' + count
      } else if (+pontuacao.textContent < 99971){
        let variacao = 64;
        count += variacao; 
        pontuacao.textContent = '0' + count
      } else if (+pontuacao.textContent < 999939){
        let variacao = 128;
        count += variacao; 
        pontuacao.textContent = count
      } else if (+pontuacao.textContent >= 999939){
        pontuacao.textContent = '999999'
      }
  },1000);
}

//CONTROLES 
function handleControls(event){
  console.log(event)
  if (event.keyCode === 32 || event.target && event.pointerType || event.keyCode === 38){
    if (!isJumping && !isFlying) 
    jump();
  }
  else if (event.keyCode === 17 && special){
    fly();
  }
}

//SALTO
function jump(){
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150){
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 5){
          position = 0;
          dino.style.bottom = position + 'px';
          clearInterval(downInterval);
          isJumping = false;
        } else if (!isFlying){
          position -= 7;
          dino.style.bottom = position + 'px';
        }
      }, 30)
    } else {
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 30)
}

//ESPECIAL - VOO
function fly(){
  isFlying = true;
  special = false;
  console.log(progress)
  let flyInterval = setInterval(() => {
    position = 80
    dino.style.bottom = position+'px';

    for(let i = 1; i < 3; i++)
    dino.style.backgroundImage = 'url(images/dino-fly'+i+'.png)';

    console.log(position)
    clearInterval(flyInterval)

    let finishInterval = setInterval(() => {
        dino.style.backgroundImage = 'url(images/dino.png)';
        position = 0;
        dino.style.bottom = position + 'px';
        clearInterval(finishInterval);
        isJumping = false;
        setTimeout(() => isFlying = false, 700);
        console.log(position)
      },20100)
  }, 10)
}
          
  //CACTOS - OK
  function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 750;
  let randomTime = Math.random() * 3000 + 800;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  bg.appendChild(cactus);

  let leftInterval = setInterval(() => {  
    if (cactusPosition < -10){
      clearInterval(leftInterval);
      bg.removeChild(cactus);
    } else if (cactusPosition > 10 && cactusPosition < 50 && position < 60 && !isFlying) {
      life = document.querySelectorAll('.show')
      if (cactusPosition = 5){
        clearInterval(leftInterval);
        bg.removeChild(cactus);
      }
      if( life.length === 3){
        lifes[0].classList.remove('show')
      } else if (life.length === 2){
        lifes[1].classList.remove('show')
      } else {
        document.body.innerHTML = `
        <h1 class="game-over"> Fim de Jogo </h1>
        <div class="d-grid col-2 mx-auto">
        <button class="btn btn-dark" onclick="window.location.reload()"> Jogar de novo </button>
        </div>
        `
      }
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 40)

  setTimeout(createCactus, randomTime);

}

//CORAÇÕES - OK
function createHearts(){
  const hearts = document.createElement('div');
  let heartPositionX = 750;
  let heartPositionY = Math.round(Math.random() * 150 + 15);
  let randomTime = Math.random() * 120000 + 30000;

  hearts.classList.add('fa-solid');
  hearts.classList.add('fa-heart');
  hearts.classList.add('hearts');
  hearts.style.left = heartPositionX + 'px';
  hearts.style.bottom = heartPositionY + 'px';
  console.log(heartPositionX,heartPositionY);
  console.log(position)
  console.log(lifes)
  bg.appendChild(hearts);

  let leftInterval = setInterval(() => {  
    let life = document.querySelectorAll('.show');
    if (heartPositionX < -5){
      clearInterval(leftInterval);
      bg.removeChild(hearts);
    } else if (heartPositionX > 10 && heartPositionX < 50 
      && heartPositionY < (position+65) && heartPositionY > (position-15) || heartPositionX < 70 && isFlying){
      console.log('pegou', position, heartPositionY)
      clearInterval(leftInterval);
      bg.removeChild(hearts)
      if (life.length === 1){
        lifes[1].classList.add('show')
      } else if (life.length === 2){
        lifes[0].classList.add('show')
      } else if (life.length > 2){
        count += 500
      }
    } else {
      heartPositionX -= 10;
      hearts.style.left = heartPositionX + 'px';
    }
  }, 40)

  setTimeout(createHearts, randomTime);

}

//PLAY
createCactus();
specialBar();
placar();
setTimeout(createHearts, 45000);
['click', 'keyup'].forEach(evt => document.addEventListener(evt, handleControls))
