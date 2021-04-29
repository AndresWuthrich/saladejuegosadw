import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }
}
