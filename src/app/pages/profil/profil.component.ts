import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: any;
  newName: string = '';
  newPassword: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe(userData => {
      this.user = userData;
      this.newName = this.user.name;
    });
  }

  updateUserName(newName: string) {
    this.apiService.updateProfile(newName).subscribe(response => {
      this.user = response;
      alert('Nom mis à jour avec succès');
    }, error => {
      alert('Erreur lors de la mise à jour du nom');
    });
  }

  updateUserPassword(newPassword: string) {
    this.apiService.updatePassword(newPassword).subscribe(response => {
      alert('Mot de passe mis à jour avec succès');
    }, error => {
      alert('Erreur lors de la mise à jour du mot de passe');
    });
  }
}
