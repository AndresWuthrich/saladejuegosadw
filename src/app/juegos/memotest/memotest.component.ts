import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ficha } from 'src/app/clases/ficha';
import { AuthService } from 'src/app/services/auth.service';
import { FichasService } from 'src/app/services/fichas.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css'],
  providers: [FichasService]
})

export class MemotestComponent implements OnInit {

  elemento:any;

  idUnico = 10;
  match: number = 0;
  arrayFichas: Ficha[] = [];
  arrayFotos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  intentos = 14;
  idU1 = "";
  idU2 = "";
  idMatch1 = "";
  idMatch2 = "";
  bandera = "false";

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, private fichaService: FichasService, private router: Router, public resService: ResultadosService) {

    console.info("Memotest:");//,this.nuevoJuego);  
  }

  // ngOnInit(): void {
  // }

  Logout(){
    this.auth.Logout();    
  }

  async ngOnInit() {

    await this.fichaService.todos().then((res: any) => {
      var array = this.consigueCuatroRandom();
      array.forEach(item => {
        console.log(array);
        var ficha = new Ficha(res[item].img, res[item].char_id, Math.floor(Math.random() * 100), this.idUnico++, this.match);
        this.arrayFichas.push(ficha);
        var ficha2: Ficha = JSON.parse(JSON.stringify(ficha))
        ficha2.orden = Math.floor(Math.random() * 100)
        ficha2.idUnico = this.idUnico++;
        this.arrayFichas.push(ficha2);

        this.match++;
      });
      this.arrayFichas.sort((a: any, b: any) => { if (a.orden > b.orden) { return 1 } return -1 })
    });

    console.log("pos", this.arrayFichas, this.arrayFichas.length);
  }

  consigueCuatroRandom() {
     var array: string[] = [];
    for (let index = 0; index < 8; index++) {

      let aux = this.arrayFotos[Math.floor(Math.random() * this.arrayFotos.length)];
      array.push(aux);

      let index = this.arrayFotos.indexOf(aux);
      if (index > -1) {
        this.arrayFotos.splice(index, 1);
      }
    }
 console.log(array);
    return array;
  }

  bloquearCartas() {
    var img1 = document.getElementById(this.idU1);
    img1?.classList.add('class', "bloqueada");
    var img2 = document.getElementById(this.idU2);
    img2?.classList.add('class', "bloqueada");
  }

  desocultarCarta(idUni: string) {
    var img = document.getElementById(idUni);
    img?.classList.remove("bloque");
  }

  ocultarCartas() {
    var img1 = document.getElementById(this.idU1);
    img1?.classList.add('class', "bloque");
    var img2 = document.getElementById(this.idU2);
    img2?.classList.add('class', "bloque");
  }


  control(imagen: any) {
    var img = document.getElementById(imagen.idUnico);
    var auxClases = img?.className;
    // console.log(auxClases?.includes("bloqueada"));

    if (!auxClases?.includes("bloqueada")) {

      //if de carta 2
      if (this.idU2 == "" && this.idU1 != "") {
        // console.log("entro c2");
        this.desocultarCarta(imagen.idUnico.toString());
        this.idU2 = imagen.idUnico;
        this.idMatch2 = imagen.match;
        this.bandera = "true";
      }

      //if de carta 1
      if (this.idU1 == "" && this.idU2 == "") {
        // console.log("entro c1");
        this.desocultarCarta(imagen.idUnico.toString());
        this.idU1 = imagen.idUnico;
        this.idMatch1 = imagen.match;
      }

      //revision
      if (this.bandera == "true") {
        // console.log("revisa");
        this.bandera = "false";
        this.controlGanador();
      }
    }
  }

  controlGanador() {
    console.log("antes del set");
    setTimeout(() => {
      if (this.idMatch1 == this.idMatch2) {
        console.log("match");
        this.bloquearCartas();
        this.reset();
      } else {
        this.ocultarCartas();
        this.reset();
        console.log("u1", this.idU1, "u2", this.idU2);
      }
      this.controlIntentos();
      this.intentos--;
    }, 1200);
  }

  controlIntentos() {
    console.log(this.intentos);
    if (this.intentos == 1) {
      this.muestraMensaje("perdiste");
    }
    else {
      var auxImg;
      var flagGano = "true";
      this.arrayFichas.forEach(e => {
        var img = document.getElementById(e.idUnico.toString());
        auxImg = img?.className;
        if (!auxImg?.includes("bloqueada")) {
          flagGano = "false";
        }
      });
      if (flagGano == "true") {
        this.muestraMensaje("ganaste");
      }
    }

  }

  muestraMensaje(aux: string) {
    console.log(aux);
    if (aux == "perdiste") {
      this.resService.agregarResultado("Perdió", "Memotest");

      Swal.fire({
        title: '¡PERDISTE!',
        text: '¿¡Lo intentarás de nuevo!?'
      });
    }
    if (aux == "ganaste") {
      this.resService.agregarResultado("Ganó", "Memotest");

      Swal.fire({
        title: '¡GANASTE!',
        text: 'Sos crack'
      });
    }
  }

  reset() {
    this.idU1 = "";
    this.idU2 = "";
    this.idMatch1 = "";
    this.idMatch2 = "";
  }
}
