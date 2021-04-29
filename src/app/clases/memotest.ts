import { Juego } from '../clases/juego'

export class Memotest extends Juego{

    ganador: boolean=false; 
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super("Memotest",gano,jugador);
      
    }

    public verificar(){
        if(this.ganador==true)
            return true;
        else
            return false;
    }
}