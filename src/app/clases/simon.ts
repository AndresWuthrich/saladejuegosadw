import { Juego } from '../clases/juego'

export class Simon extends Juego{

    ganador: boolean=false; 
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Simon dice",gano,jugador);
      
    }

    public verificar(){
        if(this.ganador==true)
            return true;
        else
            return false;
    }
}