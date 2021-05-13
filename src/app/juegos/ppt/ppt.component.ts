import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  elegido=true;
  resultado:string = '';

  elegidoUsuario:string = '';
  elegidoMaquina:string = '';
  numeroRandom:number = 0;

  elemento: any;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, public resService: ResultadosService, private router: Router) {
    this.resService.cargarResultados().subscribe(() => {});
 
    console.info("Piedra papel o tijera:");//,this.nuevoJuego);  
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
      Swal.fire({
        title: '¡GANASTE!'
      });
      // this.resultado="GANASTE";
      this.resService.agregarResultado("Ganó","Ppt");
    }
    else if (this.elegidoUsuario==this.elegidoMaquina){
      Swal.fire({
        title: 'EMPATASTE',
        text: '¿¡Lo intentarás de nuevo!?'
      });

      // this.resultado="EMPATASTE... ¿Lo intentarás de nuevo?";
      this.resService.agregarResultado("Empató","Ppt");
    }
    else{
      Swal.fire({
        title: 'PERDISTE',
        text: '¿¡Lo intentarás de nuevo!?'
      });
      // this.resultado="PERDISTE... ¿Lo intentarás de nuevo?";
      this.resService.agregarResultado("Perdió","Ppt");

    }
    console.log(this.resultado);
    //  this.router.navigate(['juegos']);
  }

  public verificar(): boolean {
    if((this.elegidoMaquina=="PIEDRA" && this.elegidoUsuario=="papel") || 
    (this.elegidoMaquina=="TIJERA" && this.elegidoUsuario=="piedra") || 
    (this.elegidoMaquina=="PAPEL" && this.elegidoUsuario=="tijera"))
        return true;
    else 
        return false;
  }

  public generarMaquina():string{
      this.numeroRandom=Math.floor((Math.random()*100)+1);
      if(this.numeroRandom>66){
          return "PIEDRA";
      }else if(this.numeroRandom>33)
          return "PAPEL";
      else 
          return "TIJERA";
  }
}
