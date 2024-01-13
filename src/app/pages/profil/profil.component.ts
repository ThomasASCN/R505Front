import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})


export class ProfilComponent implements OnInit {
  user: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getProfile().subscribe(data => {
      this.user = data;
    });
  }
}
