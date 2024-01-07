import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  adForm: FormGroup = new FormGroup({});
  message: string = '';
  isError: boolean = false;
  games: any[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.adForm = this.formBuilder.group({
      title: ['', Validators.required],
      game_id: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
     
    })
    this.apiService.getGames().subscribe(data => {
      this.games = data;
    });
  }

  onSubmit() {
    if (this.adForm.valid) {
      this.apiService.createAd(this.adForm.value).then(response => {
      
        this.message = 'Annonce créée avec succès !';
        this.isError = false;
      }).catch(error => {
       
        this.message = 'Erreur lors de la création de l\'annonce.';
        this.isError = true;
      });
    } else {
      
      this.message = 'Veuillez remplir correctement tous les champs requis.';
      this.isError = true;
      this.adForm.markAllAsTouched(); 
    }
  }
}  