import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
// import { MemotestComponent } from './componentes/memotest/memotest.component';
// import { TatetiComponent } from './componentes/tateti/tateti.component';
// import {PptComponent } from './componentes/ppt/ppt.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  // {path: 'memotest', component: MemotestComponent},
  // {path: 'ppt', component: PptComponent},
  // {path: 'tateti', component: TatetiComponent},
  {path: 'quiensoy', component: QuiensoyComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
