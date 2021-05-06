import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Resultado } from '../clases/resultado';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private dbpath = '/resultado';
  itemsCollection: AngularFirestoreCollection<Resultado>;
  public resultados: Resultado[] = [];

  constructor(private afs: AngularFirestore, public auth: AuthService) {
   }

  cargarResultados() {
    this.itemsCollection = this.afs.collection<Resultado>('resultado', ref => ref.orderBy('fecha', 'desc').limit(50));

    return this.itemsCollection.valueChanges().pipe(
      map((resultado: Resultado[]) => {
        console.log("resultado");
        this.resultados = [];
        for (let result of resultado) {
          this.resultados.unshift(result);
        }
        return this.resultados;
      })
      );
  }

  agregarResultado(resultado: string, juego: string) {
    let result: Resultado = {
      fecha: new Date().getTime(),
      resultado: resultado,
      juego: juego,
      uid: this.auth.usuario.uid,
      mail: this.auth.usuario.email,
    }
    return this.itemsCollection.add({...result});
  }
}
