import { Juego } from '../clases/juego'

export class Ppt extends Juego{

    ganador: boolean=false; 
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Piedra, papel o tijera",gano,jugador);
      
    }

    public verificar(){
        if(this.ganador==true)
            return true;
        else
            return false;
    }
}