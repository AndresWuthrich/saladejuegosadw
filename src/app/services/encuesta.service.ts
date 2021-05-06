import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encuesta } from '../clases/encuesta';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private dbpath = '/encuesta';
  itemsCollection: AngularFirestoreCollection<Encuesta>;
  public encuestas: Encuesta[] = [];

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbpath);
   }

  cargarEncuestas() {
    this.itemsCollection = this.afs.collection(this.dbpath);

    return this.itemsCollection.valueChanges().pipe(
      map((encuesta: Encuesta[]) => {
        // console.log(encuesta);
        this.encuestas = [];
        for (let datos of encuesta) {
          this.encuestas.unshift(datos);
        }
        return this.encuestas;
      })
      );
      
  }

  agregarEncuesta(nombre: string, apellido: string, edad: string, telefono: string, seleccionJuego: string, puntaje: string, opinion: string) {
    
    let encuesta: Encuesta = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      telefono: telefono,
      seleccionJuego: seleccionJuego,
      puntaje: puntaje,
      opinion: opinion,
      uid: this.auth.usuario.uid,
      mail: this.auth.usuario.email,
    }
    
    return this.itemsCollection.add({...encuesta});
  }
}
