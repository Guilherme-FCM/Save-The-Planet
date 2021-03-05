import Game from './gameCore'

export default function (vida = 100) {
    const Planeta = {
        vida,
        vidaMaxima: vida,
        vidaPlanetaElement: document.getElementById('vidaPlaneta'),

        perderVida(dano) {
            this.vida -= dano
            this.atualizarBarra()
            if (this.vida <= 0) { Game.gameOver() }
        },

        atualizarBarra() { this.barraPlaneta.style.width = (this.vida / this.vidaMaxima * 100) + '%' },
    }

    Planeta.barraPlaneta = Planeta.vidaPlanetaElement.children[0].children[0]
    Planeta.vidaPlanetaElement.style.display = 'block'
    Planeta.atualizarBarra()

    return Planeta
}