import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadosRoutingModule } from './listados-routing.module';
import { ListadosComponent } from './listados.component';
import { ResultadosComponent } from './resultados/resultados.component';


@NgModule({
  declarations: [
    ListadosComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    ListadosRoutingModule
  ]
})
export class ListadosModule { }
