import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Mensaje } from '../clases/mensaje';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
      }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
      .limit(5));

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];

        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        return this.chats;
      })
    );
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      nombre: this.auth.usuario.email,
      texto: texto,
      fecha: new Date().getTime(),
      uid: this.auth.usuario.uid
    };
    return this.itemsCollection.add(mensaje);
  }
}
