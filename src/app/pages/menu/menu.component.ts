import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu', 
  templateUrl: './menu.component.html', 
  styleUrls: ['./menu.component.scss'] 
})

export class MenuComponent {

  constructor(private apiService: ApiService, private router: Router) {}
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
  onLogout() {
    this.apiService.logout().then(() => {
      this.router.navigate(['/login']); 
    }).catch((error: any) => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }
}
