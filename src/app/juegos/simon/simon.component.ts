import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { Event, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {
  nivel= 0;
  resultado: string = '';
  terminoJuego:boolean;

  colours: Array<string> = ["green","red","yellow","blue"];
  userColours: Array<string> = new Array<string>();
  machineColours: Array<string> = new Array<string>();
  level:number = 1;
  levelJson:object = JSON.parse('{ "rounds":[{ "level":"1", "steps":"3", "speed":"800" }, { "level":"2", "steps":"2", "speed":"750" }, {"level":"3", "steps":"2", "speed":"700" }, {"level":"4", "steps":"3", "speed":"650" }, {"level":"5", "steps":"5", "speed":"600" }] }');
  rounds:object = this.levelJson["rounds"]; 
  isPlaying:boolean = false;
  currentStep:number = 0;
  speed:number = 800;

  newJuego= true;
  light= false;

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;

  constructor(public auth: AuthService, public resService: ResultadosService, private router: Router) {
    this.resService.cargarResultados().subscribe(()=>{});

    console.info("Simon:");//,this.nuevoJuego);      
     this.terminoJuego = false;
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
    let stepsCount:number = this.rounds[Object.keys(this.rounds).find(i => this.rounds[i].level === this.level.toString())].steps;
    this.fillMachineColours(stepsCount);
    this.showSteps();
    console.log(this.machineColours);
    this.isPlaying = true;
  }

  validate(event){
    let self = this;
    if(this.isPlaying){
      this.userColours.push($(event.currentTarget).attr("colour"));
      if(this.userColours[this.currentStep] == this.machineColours[this.currentStep]){
        this.currentStep++;
      }
      else{
        Swal.fire({
          title: 'PERDISTE',
          text: '????Lo intentar??s de nuevo!?'
        });
        // this.resultado="PERDISTE";
        this.terminoJuego = true;

        this.resService.agregarResultado("Perdi??","Sim??n");

        return;
      }

      if(this.userColours.length === this.machineColours.length)
        self.winGame();
    }
  }

  winGame(){
    let self = this;
    if(this.level === 3){
      Swal.fire({
        title: 'GANASTE'
      });
      // this.resultado="GANASTE!!!";
      this.terminoJuego = true;

      this.resService.agregarResultado("Gan??","Sim??n");
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
    $("#start").removeAttr("disabled");

      this.terminoJuego = false;
    this.resultado = '';
  }

  clearVariables(){
    this.userColours = [];
    this.currentStep=0;
  }

  fillMachineColours(steps){
    for(let x:number = 0; x < steps; x++){
      let randomValue = this.colours[Math.floor(Math.random() * this.colours.length)];
      this.machineColours.push(randomValue);
    }
  }  

  showSteps() {
    let self = this;
    if(self.currentStep > self.machineColours.length-1) {
      self.currentStep = 0;
      $("body").removeAttr("style");
      return;
    }
    var colour = self.machineColours[self.currentStep];
    setTimeout(function() {
      $(".pad").each(function(){
        if($(this).attr("colour") == colour){
          $(this).addClass("active");
        }
      });
    }, 300);
    setTimeout(function() {
      $(".pad").each(function(){
        if($(this).attr("colour") == colour){
          $(this).removeClass("active");        
        }
      });
      self.currentStep++;
      self.speed = self.rounds[Object.keys(self.rounds).find(i => self.rounds[i].level === self.level.toString())].speed;
      self.showSteps();
    }, self.speed);
   }
 }