import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string = '';
  password: string = '';
  mensaje: Mensaje = new Mensaje();
  
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  // constructor(private router: Router,
  //   public auth: AuthService,
  //   private mensajesService: MensajesService) { }



    constructor(public auth: AuthService) { }
  
  ngOnInit(): void {
  }
  
  // Registro(){
  //   // this.auth.usuario = 'Andres';
  //   this.router.navigate(['registro']);
  // }

  // EnviarMensaje(){
  //   console.log("msg 1");
  //   this.mensajesService.create(this.mensaje).then(() => {
  //     console.log("Mensaje enviado");
  //   });
  // }

  Logout(){
    this.auth.Logout();
  }
}
