import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  constructor(private fireStoreAuth: AngularFireAuth, private router: Router) {
    this.usuario = fireStoreAuth.authState;
   }

  Registro(email: string, password: string){
    this.fireStoreAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      // console.log('Registro exitoso');
      this.router.navigate(['home']);
    });

  }

  Ingresar(email: string, password: string){
  
    this.fireStoreAuth
    .signInWithEmailAndPassword(email, password)
    .then(value =>{
      console.log("Ingreso exitoso");
      this.router.navigate(['home']);
    });
  }
}