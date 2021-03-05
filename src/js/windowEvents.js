import Game from './gameCore'

export function teclaDw(){
    const tecla = event.keyCode
    if (tecla == 38) { Game.jogador.direcaoY = -1 }
    else if (tecla == 40) { Game.jogador.direcaoY = 1 }

    if (tecla == 39) { Game.jogador.direcaoX = 1 }
    else if (tecla == 37) { Game.jogador.direcaoX = -1 }

    if (tecla == 32) { Game.jogador.disparar() }
}

export function teclaUp(){
    const tecla = event.keyCode
    if (tecla == 38 || tecla == 40) { Game.jogador.direcaoY = 0 }
    if (tecla == 39 || tecla == 37) { Game.jogador.direcaoX = 0 }
}

export function tocarMusica(){
    const musica = new Audio('musica.mp3')
    musica.play()
}