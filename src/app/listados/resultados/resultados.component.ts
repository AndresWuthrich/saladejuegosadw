import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  // @Input()
  // listado: Array<any>;
 
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }

  ver() {
    // console.info(this.listado);
  }

}
