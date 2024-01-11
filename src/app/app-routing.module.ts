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



const routes: Routes = [
{ path :'', component: InscriptionComponent},
{ path: 'login', component: LoginComponent},
{ path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
{ path: 'ticket', component: TicketComponent},
{ path: 'tickets', component: TicketPageComponent},
{ path: 'mytickets', component: MyTicketsComponent}, 
{ path: 'menu', component: MenuComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
