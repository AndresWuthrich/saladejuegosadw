import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje: Mensaje = new Mensaje();
  constructor(private router: Router,
    private authService: AuthService,
    private mensajesService: MensajesService) { }

  ngOnInit(): void {
  }
  
  Registro(){
    this.authService.usuario = 'Andres';
    this.router.navigate(['registro']);
  }

  EnviarMensaje(){
    console.log("msg 1");
    this.mensajesService.create(this.mensaje).then(() => {
      console.log("Mensaje enviado");
    });
  }
}
