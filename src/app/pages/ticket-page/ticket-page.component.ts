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
}
