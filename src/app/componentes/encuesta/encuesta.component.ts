import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public formEncuesta: FormGroup;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  constructor(public auth: AuthService, public authEncuesta: EncuestaService, private fb: FormBuilder) { 
    this.authEncuesta.cargarEncuestas().subscribe(() => {});


    this.formEncuesta = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono': ['', Validators.required],
      // 'sexo': ['', Validators.required],
      // 'email': ['', Validators.required, Validators.email],
      'seleccionJuego': ['', Validators.required],
      'puntaje': ['', Validators.required],
      'opinion': ['', Validators.required]
      // 'terminos': ['']
    }); 
  }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }

  aceptar(): void{
    // console.log("Click botón");
    console.log(this.formEncuesta);

    var nombre = this.formEncuesta.controls['nombre'].value;
    var apellido = this.formEncuesta.controls['apellido'].value;
    var edad = this.formEncuesta.controls['edad'].value;
    var telefono = this.formEncuesta.controls['telefono'].value;
    // var email = this.formEncuesta.controls['email'].value;
    // var seleccionJuego = this.obtenerValor(this.formEncuesta.controls['seleccionJuego'].value);
    var seleccionJuego = this.formEncuesta.controls['seleccionJuego'].value;
    var puntaje = this.formEncuesta.controls['puntaje'].value;
    var opinion = this.formEncuesta.controls['opinion'].value;
    // var terminos = this.formEncuesta.controls['terminos'].value;

    this.authEncuesta.agregarEncuesta(nombre, apellido, edad, telefono, seleccionJuego, puntaje, opinion)
  }
}
