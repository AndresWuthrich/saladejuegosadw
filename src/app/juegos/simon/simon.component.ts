import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';
import { Simon } from 'src/app/clases/simon';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
// import { LocalStorageService } from '../../servicios/localStorage.service';
// import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {
  @Output() 
  enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego: Simon;
  nivel= 0;
  // secuencia: Array<any>;
  // subnivel: number;
  resultado: string = '';
  terminoJuego:boolean;
  // servicio: LocalStorageService;
  // jugadorLogueado: Jugador;
  // ocultarVerificar: boolean;
  colours: Array<string> = ["green","red","yellow","blue"];
  userColours: Array<string> = new Array<string>();
  machineColours: Array<string> = new Array<string>();
  level:number = 1;
  levelJson:object = JSON.parse('{ "rounds":[{ "level":"1", "steps":"3", "speed":"800" }, { "level":"2", "steps":"2", "speed":"750" }, {"level":"3", "steps":"2", "speed":"700" }, {"level":"4", "steps":"3", "speed":"650" }, {"level":"5", "steps":"5", "speed":"600" }] }');
  // rounds:object = this.levelJson["rounds"]; 
  isPlaying:boolean = false;
  currentStep:number = 0;
  speed:number = 800;

  newJuego= true;
  light= false;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService) {
     this.nuevoJuego = new Simon();
     console.info("Simon:");//,this.nuevoJuego);      
     this.terminoJuego = false;

    //  this.servicio = new LocalStorageService();
    //  this.jugadorLogueado=this.servicio.traerLogeado();  
    }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.Logout();
  }
  startGame(){
    $("#start").attr("disabled", "true");
    $("body").attr("style", "pointer-events: none");
    this.clearVariables();
    // let stepsCount:number = this.rounds[Object.keys(this.rounds).find(i => this.rounds[i].level === this.level.toString())].steps;
    // this.fillMachineColours(stepsCount);
    // this.showSteps();
    // console.log(this.machineColours);
    // this.isPlaying = true;
  }

  // validate(event){
  //   let self = this;
  //   if(this.isPlaying){
  //     this.userColours.push($(event.currentTarget).attr("colour"));
  //     if(this.userColours[this.currentStep] == this.machineColours[this.currentStep]){
  //       this.currentStep++;
  //     }
  //     else{
  //       this.resultado="Fallaste";
  //       this.terminoJuego = true;
  //       this.nuevoJuego.gano=false;

  //       if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado !== null))
  //       {
  //         this.nuevoJuego.jugador=this.jugadorLogueado.mail;
  //       }
  //       this.nuevoJuego.gano= this.nuevoJuego.verificar();
    
  //       this.servicio.guardarJuego(this.nuevoJuego);
  //       return;
  //     }

  //     if(this.userColours.length === this.machineColours.length)
  //       self.winGame();
  //   }
  // }

  winGame(){
    let self = this;
    if(this.level === 3){
      this.resultado="Ganaste!!!";
      // this.terminoJuego = true;
      // this.nuevoJuego.gano=true;

      // if( (typeof this.jugadorLogueado !== 'undefined') &&  (this.jugadorLogueado !== null))
      // {
      //   this.nuevoJuego.jugador=this.jugadorLogueado.mail;
      // }
      // this.nuevoJuego.gano= this.nuevoJuego.verificar();
  
      // this.servicio.guardarJuego(this.nuevoJuego);
          }
    else{
      this.isPlaying = false;
      this.level++;
      setTimeout(function() {
        self.startGame();
      }, 1000);
    }
  }

  restartGame(){
    this.machineColours = [];
    this.isPlaying = false;
    this.level = 1;
    this.speed = 800;
    // $("#start").removeAttr("disabled");

      // this.terminoJuego = false;
    this.resultado = '';
  }

  clearVariables(){
    this.userColours = [];
    this.currentStep=0;
  }

  // fillMachineColours(steps){
  //   for(let x:number = 0; x < steps; x++){
  //     let randomValue = this.colours[Math.floor(Math.random() * this.colours.length)];
  //     this.machineColours.push(randomValue);
  //   }
  }  

  // showSteps() {
  //   let self = this;
  //   if(self.currentStep > self.machineColours.length-1) {
  //     self.currentStep = 0;
  //     $("body").removeAttr("style");
  //     return;
  //   }
  //   var colour = self.machineColours[self.currentStep];
  //   setTimeout(function() {
  //     $(".pad").each(function(){
  //       if($(this).attr("colour") == colour){
  //         $(this).addClass("active");
  //       }
  //     });
  //   }, 300);
//     setTimeout(function() {
//       $(".pad").each(function(){
//         if($(this).attr("colour") == colour){
//           $(this).removeClass("active");        
//         }
//       });
//       self.currentStep++;
//       self.speed = self.rounds[Object.keys(self.rounds).find(i => self.rounds[i].level === self.level.toString())].speed;
//       self.showSteps();
//     }, self.speed);
//   }
// }