import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
/* import { PptComponent } from './componentes/ppt/ppt.component';
import { TatetiComponent } from './componentes/tateti/tateti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
 */import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'registro', component: RegistroComponent},
//   {path: 'memotest', component: MemotestComponent},
//   {path: 'ppt', component: PptComponent},
//   {path: 'tateti', component: TatetiComponent},
//   {path: 'quiensoy', component: QuiensoyComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuiensoyComponent,
    RegistroComponent,
    // PptComponent,
    // TatetiComponent,
    // MemotestComponent,
    PageNotFoundComponent,
    ChatComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }