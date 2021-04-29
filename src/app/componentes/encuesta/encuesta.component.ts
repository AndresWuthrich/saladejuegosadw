import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }
}
