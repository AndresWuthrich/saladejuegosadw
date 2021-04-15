import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { PptComponent } from './ppt/ppt.component';
import { TatetiComponent } from './tateti/tateti.component';

const routes: Routes = [
  { path: 'juegos', component: JuegosComponent },
  { path: 'tateti', component: TatetiComponent },
  { path: 'ppt', component: PptComponent },
  { path: '', redirectTo: 'juegos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
