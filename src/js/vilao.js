import { alturaTela, larguraTela } from './dimensoesTela'
import gerarNumeroAleatorio from './numeroAleatorio'
import Game from './gameCore'

export default function (contador = 0, velocidade = 2, velocidadeDisparo = 2, delayDisparo = 2000, danoDisparo = 5, vida = 100){
    return {
        contador, velocidade, velocidadeDisparo, delayDisparo, danoDisparo, vida, 
        vidaMaxima: vida,
        inGame: false,
        posicaoAlvo: gerarNumeroAleatorio(),
        vilaoElement: document.getElementById('vilao'),
        vidaVilaoElement: document.getElementById('vidaVilao'),
        direcaoX: 1,
        posicaoX: larguraTela / 2 - 70,
        posicaoY: -140,

        criar(){
            this.vilaoElement.setAttribute('style', `background-image: url(vilao${this.contador + 1}.gif); top: ${this.posicaoY}px; left: ${this.posicaoX}px; display: block`)
            this.inGame = true
            this.criarBarraVida()
            this.desparosVilao = setInterval(this.disparar.bind(this), this.delayDisparo)
            Game.jogador.criarBarraVida()
        },

        destruir(){
            this.inGame = false
            this.vidaVilaoElement.style.display = 'none'
            Game.jogador.vidaJogadorElement.style.display = 'none'
            this.vilaoElement.style.display = 'none'
            clearInterval(this.desparosVilao)
            Game.contadorGerenciarGameMode++
            Game.jogador.incrementarPontuacao(100)
        },

        criarBarraVida() {
            this.barraVilao = this.vidaVilaoElement.children[0].children[0]
            this.vidaVilaoElement.style.display = 'block'
            this.atualizarBarra()
        },

        perderVida(dano) {
            this.vida -= dano
            this.atualizarBarra()
            if (this.vida <= 0) { this.destruir() }
        },

        atualizarBarra() { this.barraVilao.style.width = (this.vida / this.vidaMaxima * 100) + '%' },

        disparar(){
            const tiro = document.createElement('div')
            tiro.setAttribute('class', 'tiroVilao')
            console.log(this)
            console.log(this.vilaoElement)
            tiro.setAttribute('style', 'top:' + (this.posicaoY + this.vilaoElement.offsetHeight) + 'px; left:' + (this.posicaoX + (this.vilaoElement.offsetWidth / 2)) + 'px;')
            document.body.appendChild(tiro)
        },

        controlarDisparos(){
            const tiros = document.getElementsByClassName('tiroVilao')
            for (let t = 0; t < tiros.length; t++) {
                let p = tiros[t].offsetTop
                p += this.velocidadeDisparo
                tiros[t].style.top = p + 'px'
                this.controlaColisaoDisparoJogador(tiros[t])
                if (p > alturaTela) tiros[t].remove()
            }
        },

        controlaColisaoDisparoJogador(tiro){
            const naveJogador = Game.jogador.naveElement
            if ((tiro.offsetLeft >= naveJogador.offsetLeft 
                && (tiro.offsetLeft <= naveJogador.offsetLeft + naveJogador.offsetWidth))
                && (tiro.offsetTop >= naveJogador.offsetTop)) {
                tiro.remove()
                Game.jogador.perderVida(this.danoDisparo) 
            }
        },

        controlar(){
            if (this.inGame){
                if (this.posicaoY < 0) { 
                    this.posicaoY += 0.5
                    this.vilaoElement.style.top = this.posicaoY + 'px'
                }

                if ((this.direcaoX == -1 && this.posicaoX <= this.posicaoAlvo) 
                    || (this.direcaoX == 1 && this.posicaoX >= this.posicaoAlvo)) { 
                    this.posicaoAlvo = gerarNumeroAleatorio() 
                } 

                this.direcaoX = this.posicaoX < this.posicaoAlvo ? 1 : -1 
                this.posicaoX += this.velocidade * this.direcaoX
                this.vilaoElement.style.left = this.posicaoX + 'px'
            }
            
            this.controlarDisparos()
        }
    }
}