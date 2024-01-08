import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  ads: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getValidAds().subscribe(data => {
      this.ads = data;
    });
  }

  
  validateAd(adId: number) {
    this.apiService.validateAd(adId).subscribe({
      next: (response) => {
        // Rafraîchir la liste des annonces après la validation
        this.refreshAds();
        alert(response.message);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
  
  refreshAds() {
    this.apiService.getValidAds().subscribe(data => {
      this.ads = data;
    });
  }
  
}


