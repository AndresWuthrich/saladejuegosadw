import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MensajesService } from 'src/app/services/mensajes.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  // mensaje: Mensaje = new Mensaje();
  elemento: any;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, public chat: ChatService) {
    this.chat.cargarMensajes()
    .subscribe(() => {

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
   }

   enviarMensaje() {
    // console.log("msg 1");
    // this.chat.create(this.mensaje).then(() => {
    //   console.log("Mensaje enviado");
    // });

    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chat.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = '')
      .catch((err) => console.error('error al enviar', err));
  }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }
}
