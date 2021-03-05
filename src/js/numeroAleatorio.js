import { larguraTela } from './dimensoesTela'

export default () => 
    (Math.random() * (larguraTela - (larguraTela * 30 / 100))) + (larguraTela * 15 / 100)