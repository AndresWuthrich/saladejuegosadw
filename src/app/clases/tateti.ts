import { Juego } from '../clases/juego'

export class Tateti extends Juego{

    ganador: boolean=false; 
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Tateti",gano,jugador);
      
    }

    public verificar(){
        if(this.ganador==true)
            return true;
        else
            return false;
    }
}