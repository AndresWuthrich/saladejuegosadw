export class Ficha {
    id:number;
    imagen:string;
    orden:number;
    idUnico:number;
    match:number;

    constructor( imagen:string, id:number, orden:number, idUnico:number, match:number){
        this.id = id;
        this.orden = orden;
        this.idUnico = idUnico;
        this.match = match;
        this.imagen = imagen;
    }
}
