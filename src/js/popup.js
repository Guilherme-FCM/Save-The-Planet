import Game from './gameCore'

export default {

    popupElement: document.getElementById('popup'),
    numNaves: 7,
    atributosNave: [
        // velocidade, velocidadeDisparo, delayDisparo , danoDisparo, vida
        [],
        [6, 6],
        [3, 6, 180],
        [undefined, 7, undefined, 6],
        [8, 7, 100, 3],
        [7, 8, 160, 8],
        [10, 10, 50, 10, 150]
    ],

    criar(){
        this.show()
        this.setValueLocalStorage()

        const nave_container = document.getElementById('nave-container-items')

        for (let x = 0; x < this.numNaves; x++){
            const div = document.createElement('div')
            div.setAttribute('class', x > 2 ? 'nave-item disable' : 'nave-item')
            div.setAttribute('id', x)
            
            this._addClickEvent(div)

            const div1 = document.createElement('div')
            const div2 = this._createDivAtributesNaveGame(x)
            const hr = document.createElement('hr')
            const img = document.createElement('img')
            img.setAttribute('src', `nave${x + 1}.gif`)
            div1.appendChild(img)
            div.appendChild(div1)
            div.appendChild(hr)
            div.appendChild(div2)
            nave_container.appendChild(div)
        }
    },

    _createDivAtributesNaveGame(x){
        const attr = ['veloc.', 'disparo', 'delay', 'dano']
        const cores = ['purple', 'yellow', 'orange', 'red']
        const container = document.createElement('div')
        
        for (let z = 0; z < attr.length; z++){
            const div = document.createElement('div')
            div.setAttribute('class', 'atributosNave') 
            div.innerHTML = attr[z]
            let wid = this.atributosNave[x][z] || (z == 2 ? 200 : 5)
            wid *= wid > 10 ? 0.5 : 10
            div.setAttribute('style', 'width:' + wid + '%; background-color:'+ cores[z])
            container.appendChild(div)
        }
        return container
    },

    _addClickEvent(element){
        element.addEventListener('click', e => {    
            document.querySelectorAll('.nave-item').forEach(divs => { divs.classList.remove('active') })
            e.currentTarget.classList.add('active')
            this.habilitarButtonStart(e.currentTarget.firstChild.firstChild, e.currentTarget.id)
        })
    },

    setValueLocalStorage(){
        if (!localStorage.getItem('pontuacaoMaxima')) { localStorage.setItem('pontuacaoMaxima', 0) }
        document.getElementById('pontuacaoMaxima').children[0].innerHTML = localStorage.getItem('pontuacaoMaxima')
    },

    show(bool = true) { this.popupElement.style.display = bool ? 'block' : 'none' },

    habilitarButtonStart(imagem, atributos){
        document.querySelector('#popup-btn').classList.add('enable')
        document.querySelector('#popup-btn').addEventListener('click', () => {
            this.show(false)
            Game.inicializar(imagem.src, this.atributosNave[atributos])
        })
    },

    rotacionarNavesDireita(){
        const naves = document.getElementsByClassName('nave-item')
        
        if (Array.from(naves[this.numNaves - 1].classList).includes('disable')){
            const classes = Array.from(naves).map(nave => nave.className)

            for (let n = 0; n < this.numNaves; n++){
                if (n == 0) { naves[n].className = classes[this.numNaves - 1] }
                else { naves[n].className = classes[n - 1] }
            }
        }
    },

    rotacionarNavesEsquerda(){
        const naves = document.getElementsByClassName('nave-item')
        
        if (Array.from(naves[0].classList).includes('disable')){
            const classes = Array.from(naves).map(nave => nave.className)

            for (let n = 0; n < this.numNaves; n++){
                if (n + 1 == this.numNaves) { naves[n].className = classes[0] }
                else naves[n].className = classes[n + 1]
            }
        } 
    }
}

