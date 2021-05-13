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

  public chats: Observable<any[]>;
  mensaje: string = '';
  // mensaje: Mensaje = new Mensaje();
  elemento: any;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, public chat: ChatService) {
    this.chat.cargarMensajes()
    .subscribe(() => {
      console.log(this.elemento);
      if(this.elemento){
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 6000);
  
      }

    });

    this.chat.cargarMensajesEmail()
    .subscribe(() => {
      console.log(this.elemento);
      if(this.elemento){
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 6000);
  
      }

    });
  }

   enviarMensaje() {
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chat.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = "")
      .catch((err) => console.error('error al enviar', err));
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
    console.log("sad"+this.elemento);
  }

  Logout(){
    this.auth.Logout();
  }
}
