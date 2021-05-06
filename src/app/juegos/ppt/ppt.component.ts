import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  // @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  // nuevoJuego: Ppt;
  // ocultarVerificar:boolean = false;

  elegido=true;
  resultado:string = '';

  elegidoUsuario:string = '';
  elegidoMaquina:string = '';
  numeroRandom:number = 0;

  elemento: any;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, public resService: ResultadosService, private router: Router) {
    this.resService.cargarResultados().subscribe(() => {});
 

    // this.nuevoJuego = new Ppt();
    console.info("Piedra papel o tijera:");//,this.nuevoJuego);  
    // this.ocultarVerificar=false;
   }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }

  jugar(humanoObjeto:string){
    console.log("hola");
    this.elegidoMaquina=this.generarMaquina();
    console.log(this.elegidoMaquina);
    this.elegidoUsuario=humanoObjeto;
    console.log(this.elegidoUsuario);
    this.elegido=false;

    if(this.verificar()){
      this.resultado="GANASTE";
      this.resService.agregarResultado("Ganó","Ppt");
    }
    else if (this.elegidoUsuario==this.elegidoMaquina){
      this.resultado="EMPATASTE... ¿Lo intentarás de nuevo?";
      this.resService.agregarResultado("Empató","Ppt");
    }
    else{
      this.resultado="PERDISTE... ¿Lo intentarás de nuevo?";
      this.resService.agregarResultado("Perdió","Ppt");

    }
    console.log(this.resultado);
    //  this.router.navigate(['juegos']);
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

  public verificar(): boolean {
    if((this.elegidoMaquina=="piedra" && this.elegidoUsuario=="papel") || 
    (this.elegidoMaquina=="tijera" && this.elegidoUsuario=="piedra") || 
    (this.elegidoMaquina=="papel" && this.elegidoUsuario=="tijera"))
        return true;
    else 
        return false;
  }

  public generarMaquina():string{
      this.numeroRandom=Math.floor((Math.random()*100)+1);
      if(this.numeroRandom>66){
          return "piedra";
      }else if(this.numeroRandom>33)
          return "papel";
      else 
          return "tijera";
  }
}
