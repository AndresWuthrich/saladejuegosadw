import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Ppt } from 'src/app/clases/ppt';
import { AuthService } from 'src/app/services/auth.service';

// import { LocalStorageService } from '../../servicios/localStorage.service';
// import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: Ppt;
  // Mensajes:string;
  // contador:number;
  ocultarVerificar:boolean;

  elegido=true;
  // rutaDeFoto:string;  
  resultado:string = '';
  // ganar: boolean;
  // servicio: LocalStorageService;
  // jugadorLogueado: Jugador;


  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService) {
    this.nuevoJuego = new Ppt();
    console.info("Piedra papel o tijera:");//,this.nuevoJuego);  
    this.ocultarVerificar=false;

    // this.servicio=new LocalStorageService();
    // this.jugadorLogueado=this.servicio.traerLogeado();    

   }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }

  jugar(humanoObjeto:string){
    // this.nuevoJuego.elegidoMaquina=this.nuevoJuego.generarMaquina();
    // this.nuevoJuego.elegidoUsuario=humanoObjeto;
    this.elegido=false;
    

    if(this.nuevoJuego.verificar()){
      this.resultado="GANASTE";
      this.nuevoJuego.gano=true;
    }
    // else if (this.nuevoJuego.elegidoUsuario==this.nuevoJuego.elegidoMaquina)
      // this.resultado="EMPATASTE... ¿Lo intentarás de nuevo?";
    // else{
    //   this.resultado="PERDISTE... ¿Lo intentarás de nuevo?";
      this.nuevoJuego.gano=false;
    // }

    // if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado!== null))
    // {
    //   this.nuevoJuego.gano= this.nuevoJuego.verificar();
    //   this.nuevoJuego.jugador=this.jugadorLogueado.mail;
    // }
    // else{
    //   this.nuevoJuego.gano= this.nuevoJuego.verificar();
    // }

    // this.servicio.guardarJuego(this.nuevoJuego);
  }
}
