import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Mensaje } from './models/mensaje';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private itemsCollection: AngularFirestoreCollection<any>;
  // public chats: Mensaje[] = [];
  public usuario: any = {};

  // importo el servicio de firestore segun la documentacion de algularFire2
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe( user => {
        console.log('estado del usuario', user);

        if (!user) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      });
    }

  CargarMensajes() {
    // ordeno por fecha los mensajes
    // this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
    //   .limit(5));

    // para estar pendientes de todos los cambios
    // return this.itemsCollection.valueChanges().pipe(
    //   map((mensajes: Mensaje[]) => {
    //     console.log(mensajes);
    //     this.chats = [];

    //     for (const mensaje of mensajes) {
    //       this.chats.unshift(mensaje);
    //     }

    //     return this.chats;
    //   })
    // );
  }

  AgregarMensaje(texto: string) {
    // const mensaje: Mensaje = {
    //   nombre: this.usuario.nombre,
    //   mensaje: texto,
    //   fecha: new Date().getTime(),
    //   uid: this.usuario.uid
    // };
    // return this.itemsCollection.add(mensaje);
  }
}
