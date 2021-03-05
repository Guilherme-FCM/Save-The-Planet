import Jogador from './jogador'
import Vilao from './vilao'
import Bomba from './bomba'
import Planeta from './planeta'

export default {
    contadorGerenciarGameMode: 0,
    contadorVilao: 0,
    gameStatus: true,
    atributosViloes: [
        [],
        [undefined, 3, 1950, undefined,  120],
        [3, 3, 1750, 7, 150],
        [5, 5, 1500, 10, 200],
    ],
    
    inicializar(imagem, atributosJogador) {
        this.jogador = Jogador(imagem, ...atributosJogador)
        this.bomba = Bomba()
        this.planeta = Planeta()     
        this.vilao = Vilao()
        this.intervalBomba = setInterval(this.bomba.criar, this.bomba.velocidadeCriacao)
        this.controlarGameLoop()
    },
    
    gerenciarGameMode() {
        if (this.jogador.pontuacao % 5 == 0) {
            if (this.contadorGerenciarGameMode < 3) {
                this.bomba.incrementarVelocidade()
                this.contadorGerenciarGameMode++
            } else if (this.contadorGerenciarGameMode == 3) {
                if (!this.vilao.inGame) {
                    this.vilao = Vilao(this.contadorVilao, ...this.atributosViloes[this.contadorVilao])
                    this.vilao.criar()
                    this.contadorVilao = this.contadorVilao < 3 ? this.contadorVilao + 1 : 0
                }
            } else {
                clearInterval(this.intervalBomba)
                this.bomba.decrementarVelocidadeCriacao()
                this.intervalBomba = setInterval(this.bomba.criar, this.bomba.velocidadeCriacao)
                this.contadorGerenciarGameMode = 0
            }
        }
    },
    
    gameOver() {
        if (this.jogador.pontuacao > parseInt(localStorage.getItem('pontuacaoMaxima'))) {
            localStorage.setItem('pontuacaoMaxima', this.jogador.pontuacao)
        }
        document.location.reload(true)
    },
    
    controlarGameLoop() {
        if (this.gameStatus) {
            this.jogador.controlar()
            this.vilao.controlar()
            this.bomba.controlar()
        }
        requestAnimationFrame(this.controlarGameLoop.bind(this))
    }  
}