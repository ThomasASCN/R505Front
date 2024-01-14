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
  doubleValidatedAds: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAcceptedAds().subscribe(data => {
      this.acceptedAds = data;
    });

    this.apiService.getPostedAds().subscribe(data => {
      this.postedAds = data;
    });
   
      this.apiService.getDoubleValidatedAds().subscribe(ads => {
        this.doubleValidatedAds = ads;
      });
    
  }

unvalidateAd(adId: number) {
  this.apiService.unvalidateAd(adId).subscribe({
    next: (response) => {
      console.log(response.message);


      this.acceptedAds = this.acceptedAds.filter(ad => ad.id !== adId);
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de la validation:', err);
    }
  });
}


finalizeAdValidation(adId: number, isValid: boolean) {
  this.apiService.finalizeAdValidation(adId, isValid).subscribe({
    next: (response) => {
      console.log(response.message);

      if (isValid) {
        const validatedAd = this.postedAds.find(ad => ad.id === adId);
        this.postedAds = this.postedAds.filter(ad => ad.id !== adId);
        if (validatedAd) {
          this.doubleValidatedAds.push(validatedAd);
        }
      }
    },
    error: (err) => {
      console.error('Erreur lors de la validation de l\'annonce:', err);
    }
  });
}



removeDoubleValidation(adId: number) {
  this.apiService.unfinalizeAdValidation(adId).subscribe({
    next: response => {
      console.log(response.message);

      this.doubleValidatedAds = this.doubleValidatedAds.filter(ad => ad.id !== adId);

    },
    error: error => {
      console.error('Erreur lors de la suppresion du rendez-vous',error);
    }
  });
}


deleteAd(adId: number) {
  this.apiService.deleteAd(adId).subscribe({
    next: response => {
      console.log(response.message);
            this.postedAds = this.postedAds.filter(ad => ad.id !== adId);
    },
    error: error => {
      console.error('Erreur lors de la suppression de l\'annonce', error);
    }
  });

}
}