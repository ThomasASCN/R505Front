import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';


const routes: Routes = [
{ path :'', component: InscriptionComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
