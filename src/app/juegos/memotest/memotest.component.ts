import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Memotest } from 'src/app/clases/memotest';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: Memotest;
 
  // resultado:string;
  // ganar: boolean;
  // servicio: LocalStorageService;
  // jugadorLogueado: Jugador;


  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  
  constructor(public auth: AuthService) {
    this.nuevoJuego = new Memotest();
    console.info("Memotest:");//,this.nuevoJuego);  
 
    // this.servicio=new LocalStorageService();
    // this.jugadorLogueado=this.servicio.traerLogeado();    
  }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();    
  }

}
