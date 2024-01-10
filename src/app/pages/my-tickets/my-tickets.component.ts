import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})

export class MyTicketsComponent implements OnInit {
  acceptedAds: any[] = [];
  postedAds: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAcceptedAds().subscribe(data => {
      this.acceptedAds = data;
    });

    this.apiService.getPostedAds().subscribe(data => {
      this.postedAds = data;
    });
  }

unvalidateAd(adId: number) {
  this.apiService.unvalidateAd(adId).subscribe({
    next: (response) => {
      console.log(response.message);
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de la validation:', err);
    }
  });
}
}