import { larguraTela, alturaTela } from './dimensoesTela'
import Game from './gameCore'

export default function (srcImagem, velocidade = 5, velocidadeDisparo = 5, delayDisparo = 200, danoDisparo = 5, vida = 100) {
    const jogador = {
        velocidade, velocidadeDisparo, delayDisparo, danoDisparo, vida,
        vidaMaxima: vida,
        imagem: srcImagem,
        naveElement: document.getElementById('naveJogador'),
        vidaJogadorElement: document.getElementById('vidaJogador'),
        posicaoX: (larguraTela / 2) - (document.getElementById('naveJogador').offsetWidth / 2),
        posicaoY: alturaTela - 200,
        disparoLiberado: true,
        direcaoX: 0,
        direcaoY: 0,
        pontuacao: 0,

        atualizarPosicaoNave(){
            this.naveElement.style.top = this.posicaoY + 'px'
            this.naveElement.style.left = this.posicaoX + 'px'
        },
        
        incrementarPontuacao(quantidade = 1){
            this.pontuacao += quantidade
            document.getElementById('pontuacao').innerHTML = this.pontuacao
        },
        
        criarBarraVida(){
            this.barraJogador = vidaJogador.children[0].children[0]
            this.vidaJogadorElement.style.display = 'block'
            this.atualizarBarra()
        },
        
        perderVida(dano){
            this.vida -= dano
            this.atualizarBarra()
            if (this.vida <= 0) { Game.gameOver() }
        },

        atualizarBarra(){ this.barraJogador.style.width = (this.vida / this.vidaMaxima * 100) + '%' },
        
        disparar() {
            if (this.disparoLiberado) {
                const tiro = document.createElement('div')
                tiro.setAttribute('class', 'tiroJogador')
                tiro.setAttribute('style', 'top:' + this.posicaoY + 'px; left:' + (this.posicaoX + this.naveElement.offsetWidth / 2) + 'px;')
                document.body.appendChild(tiro)
                this.disparoLiberado = false
                setTimeout(() => { this.disparoLiberado = true }, this.delayDisparo)
            }
        },

        controlarDisparos() {
            const tiros = document.getElementsByClassName('tiroJogador')
            for (let t = 0; t < tiros.length; t++) {
                let p = tiros[t].offsetTop
                p -= this.velocidadeDisparo
                tiros[t].style.top = p + 'px'
                this.controlaColisaoDisparo(tiros[t])
                if (p < 0) tiros[t].remove()
            }
        },

        controlaColisaoDisparo(tiro) {
            const bombas = document.getElementsByClassName('bomba')
            const vilaoElement = Game.vilao.vilaoElement
            for (let i = 0; i < bombas.length; i++) {
                if ((tiro.offsetLeft >= bombas[i].offsetLeft 
                    && (tiro.offsetLeft <= bombas[i].offsetLeft + bombas[i].offsetWidth))
                    && (tiro.offsetTop <= bombas[i].offsetTop + bombas[i].offsetHeight)) {
                    tiro.remove()
                    Game.bomba.criarExplosao(bombas[i])
                    bombas[i].remove()
                    this.incrementarPontuacao()
                    Game.gerenciarGameMode()

                } else if ((tiro.offsetLeft >= vilaoElement.offsetLeft) 
                    && (tiro.offsetLeft <= vilaoElement.offsetLeft + vilaoElement.offsetWidth)
                    && (tiro.offsetTop <= vilaoElement.offsetTop + vilaoElement.offsetHeight)
                    && Game.vilao.inGame) {
                    tiro.remove()
                    Game.vilao.perderVida(this.danoDisparo) 
                }
            }
            
        },

        controlar() {
            if (this.posicaoY < 0) { this.posicaoY = 0 }
            else if (this.posicaoY > alturaTela - this.naveElement.offsetWidth) 
                { this.posicaoY = window.innerHeight - this.naveElement.offsetWidth } 
            else { this.posicaoY += this.direcaoY * this.velocidade }

            if (this.posicaoX < 0) { this.posicaoX = 0 }
            else if (this.posicaoX > larguraTela - this.naveElement.offsetWidth) 
                { this.posicaoX = window.innerWidth - this.naveElement.offsetWidth }
            else { this.posicaoX += this.direcaoX * this.velocidade }

            this.atualizarPosicaoNave()
            this.controlarDisparos()
        }
    }

    jogador.atualizarPosicaoNave()
    jogador.naveElement.style.display = ''
    jogador.naveElement.style.backgroundImage = 'url(' + jogador.imagem + ')'

    return jogador
}