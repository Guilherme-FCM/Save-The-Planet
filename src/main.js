import './assets/imagens/foguete.png'
import './assets/imagens/trofeu.png'
import './assets/imagens/nave1.gif'
import './assets/imagens/nave2.gif'
import './assets/imagens/nave3.gif'
import './assets/imagens/nave4.gif'
import './assets/imagens/nave5.gif'
import './assets/imagens/nave6.gif'
import './assets/imagens/nave7.gif'
import './assets/imagens/vilao1.gif'
import './assets/imagens/vilao2.gif'
import './assets/imagens/vilao3.gif'
import './assets/imagens/vilao4.gif'
import './assets/imagens/explosao.gif'
import './assets/musica.mp3'
import './assets/somExplosao.mp3'

import './css/index.css'
import './css/game.css'
import './css/popup.css'
import './css/barrasVida.css'

import Popup from './js/popup'
import { teclaDw, teclaUp, tocarMusica } from './js/windowEvents'

window.addEventListener('keydown', teclaDw)
window.addEventListener('keyup', teclaUp)
window.addEventListener('load', tocarMusica)

document.getElementById('btn-jogar')
    .addEventListener('click', function(){
        document.getElementById('container-jogar').style.display = 'none'
        Popup.criar()
    })

document.querySelector('.fa-arrow-right')
    .addEventListener('click', Popup.rotacionarNavesDireita.bind(Popup))
document.querySelector('.fa-arrow-left')
    .addEventListener('click', Popup.rotacionarNavesEsquerda.bind(Popup))