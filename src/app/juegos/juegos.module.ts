import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { MemotestComponent } from './memotest/memotest.component';
import { TatetiComponent } from './tateti/tateti.component';
import { PptComponent } from './ppt/ppt.component';
import { SimonComponent } from './simon/simon.component';


@NgModule({
  declarations: [
    JuegosComponent,
    MemotestComponent,
    TatetiComponent,
    PptComponent,
    SimonComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
