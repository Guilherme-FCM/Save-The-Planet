import gerarNumeroAleatorio from './numeroAleatorio'
import { alturaTela } from './dimensoesTela'
import Game from './gameCore'

export default (dano = 5, velocidade = 2, velocidadeCriacao = 2000, quantidade = 100) => ({
    dano, velocidade, velocidadeCriacao, quantidade,

    criar() {
        const x = gerarNumeroAleatorio()
        const bomb = document.createElement('div')
        bomb.setAttribute('class', 'bomba')
        bomb.setAttribute('style', 'top: 0px; left:' + x + 'px')
        document.body.appendChild(bomb)
    },

    criarExplosao(bomba) {
        if (document.querySelectorAll('.explosao').length >= 2) document.querySelectorAll('.explosao')[0].remove()
        const div = document.createElement('div')
        const img = document.createElement('img')
        const som = new Audio('./somExplosao.mp3')
        som.currentTime = 1
        som.play()
        img.setAttribute('src', './explosao.gif?' + new Date())
        img.width = '50'
        div.setAttribute('class', 'explosao')
        div.setAttribute('style', 'top:' + bomba.offsetTop + 'px; left:' + bomba.offsetLeft + 'px;')
        div.appendChild(img)
        document.body.appendChild(div)

    },

    decrementarVelocidadeCriacao(valor = 200) { this.velocidadeCriacao -= valor },

    incrementarVelocidade(valor = 0.2) { this.velocidade += valor },

    controlar() {
        const bombas = document.getElementsByClassName('bomba')

        for (let b = 0; b < bombas.length; b++) {
            let p = bombas[b].offsetTop
            p += this.velocidade
            bombas[b].style.top = p + 'px'

            if (p > alturaTela - bombas[b].offsetHeight) {
                Game.planeta.perderVida(this.dano)
                
                if (bombas[b]) {
                    this.criarExplosao(bombas[b])
                    bombas[b].remove()
                }
            }
        }
    }
})