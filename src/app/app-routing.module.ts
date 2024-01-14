import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';
import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AvisComponent } from './pages/avis/avis.component';



const routes: Routes = [
{ path :'inscription', component: InscriptionComponent},
{ path: 'login', component: LoginComponent},
{ path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
{ path: 'ticket', component: TicketComponent, canActivate: [AuthGuard]},
{ path: 'tickets', component: TicketPageComponent, canActivate: [AuthGuard]},
{ path: 'mytickets', component: MyTicketsComponent, canActivate: [AuthGuard]}, 
{ path: 'menu', component: MenuComponent},
{ path: '', component: AccueilComponent},
{ path: 'avis', component: AvisComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
