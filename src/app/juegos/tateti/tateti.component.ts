import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Tateti } from '../../clases/tateti';

// import { LocalStorageService } from '../../servicios/localStorage.service';
// import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})

export class TatetiComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: Tateti;
  // servicio: LocalStorageService;
  // jugadorLogueado: Jugador;

  ganoO=false;
  ganoX=false;
  ganador=false;
  empate=false;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService) {
    this.nuevoJuego = new Tateti();
    console.info("Tateti:");//,this.nuevoJuego);      

    // this.servicio = new LocalStorageService();
    // this.jugadorLogueado=this.servicio.traerLogeado();  
  }

  ngOnInit(): void {
  }

  posiciones=[['-','-','-'],
  ['-','-','-'],
  ['-','-','-']];
  jugador='O';

  presion(fila:number,columna:number) {
    if (this.posiciones[fila][columna]=='-') {
      this.posiciones[fila][columna]=this.jugador;
      this.verificarGano('X');
      this.verificarGano('O');
      if (this.ganador!=true){
        this.verificarEmpate();
        this.cambiarJugador();
      }
    }
  }

  nuevoTateti() {
    for(let f=0;f<3;f++)
    for(let c=0;c<3;c++)
    this.posiciones[f][c]='-';
    this.ganador=false;
    this.ganoO=false;
    this.ganoX=false;
    this.empate=false;
  }

  cambiarJugador() {
    if (this.jugador=='O')
      this.jugador='X';
    else
      this.jugador='O';    
  }

  chequear(ficha:string){
    if (ficha=="X"){
      this.ganoX=true;
      this.ganador=true;
    }  
    else{
      this.ganoO=true;
      this.ganador=true;
    }  
    // this.ocultarVerificar=true;
    // this.ganador= true;
    // clearInterval(this.repetidor);

    // this.perdio=!(this.nuevoJuego.verificar());

    this.nuevoJuego.gano= this.nuevoJuego.verificar();
    // if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado !== null))
    // {
    //   this.nuevoJuego.jugador=this.jugadorLogueado.mail;
    // }
    
    // this.servicio.guardarJuego(this.nuevoJuego);
}
  verificarGano(ficha: string) {
    if (this.posiciones[0][0]==ficha && this.posiciones[0][1]==ficha && this.posiciones[0][2]==ficha)
      this.chequear(ficha);
    if (this.posiciones[1][0]==ficha && this.posiciones[1][1]==ficha && this.posiciones[1][2]==ficha)
      this.chequear(ficha);
    if (this.posiciones[2][0]==ficha && this.posiciones[2][1]==ficha && this.posiciones[2][2]==ficha)
      this.chequear(ficha);
    if (this.posiciones[0][0]==ficha && this.posiciones[1][0]==ficha && this.posiciones[2][0]==ficha)
      this.chequear(ficha);
    if (this.posiciones[0][1]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][1]==ficha)
      this.chequear(ficha);
    if (this.posiciones[0][2]==ficha && this.posiciones[1][2]==ficha && this.posiciones[2][2]==ficha)
      this.chequear(ficha);    
    if (this.posiciones[0][0]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][2]==ficha)
      this.chequear(ficha);
    if (this.posiciones[0][2]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][0]==ficha)
      this.chequear(ficha);    
  }
  verificarEmpate() {
    if (this.posiciones[0][0]!='-' && this.posiciones[0][1]!='-' && this.posiciones[0][2]!='-' && this.posiciones[1][0]!='-' && 
        this.posiciones[1][1]!='-' && this.posiciones[1][2]!='-' && this.posiciones[2][0]!='-' && this.posiciones[2][1]!='-' && 
        this.posiciones[2][2]!='-')
          this.empate=true;
  }

  Logout(){
    this.auth.Logout();
  }
}
