import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string = '';
  password: string = '';

  private dbpath = '/usuarios';

  usuarioIngresado: any;
  constructor(public auth: AuthService) {
    // this.usuarioIngresado = this.authService.usuario;
   }

  ngOnInit(): void {
  }

  Registro(){
    this.auth.Registro(this.email, this.password);
    this.email = this.password = '';
  }

}
