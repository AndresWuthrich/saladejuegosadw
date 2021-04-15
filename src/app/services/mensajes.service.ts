import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private dbpath = '/mensajes'; //creo una ruta por cada colección, o cambiar parámetro 
  mensajesRef: AngularFirestoreCollection<Mensaje>;

  constructor(private db: AngularFirestore) {
    this.mensajesRef = db.collection(this.dbpath);
  }

  //servicio que retorna los docuemntos de la colección de mensajes
  getAll(): AngularFirestoreCollection<Mensaje>{
    return this.mensajesRef;
  }

  //servicio para agregar
  create(mensaje: Mensaje):any{
    console.log("msg 2");
    return this.mensajesRef.add({...mensaje});
  }
}
