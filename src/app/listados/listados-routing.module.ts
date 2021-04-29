import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadosComponent } from './listados.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  { path: 'listados', component: ListadosComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: '', redirectTo: 'listados', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadosRoutingModule { }
