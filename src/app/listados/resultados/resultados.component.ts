import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  // public resultados: Observable<any[]> = this.resulService.cargarResultados();

  public resultados: Observable<any[]>;
  elemento: any;
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  constructor(public resulService: ResultadosService, public auth: AuthService) {
    this.resulService.cargarResultados().subscribe(()=>{
      console.log("this.elemento");
      if(this.elemento){
        setTimeout(()=>{
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 6000);
      }
    });
   }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }
}
