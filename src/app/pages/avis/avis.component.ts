import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  users: any[] = [];
  reviewForm: FormGroup;
  currentUser: any; 
  selectedUserId?: number;
  allReviews: any[] = [];
  filteredReviews: any[] = [];
  searchQuery: string = '';
 

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  
    this.reviewForm = this.formBuilder.group({
      message: ['', Validators.required],
      reviewed_user_id: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getCurrentUser();
    this.initializeForm();
    this.loadUsers(); 
    this.loadAllReviews();


  }

  getCurrentUser() {
    this.apiService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user; 
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
      }
    );
  }

  initializeForm() {
    this.reviewForm = this.formBuilder.group({
      message: ['', Validators.required],
      reviewed_user_id: ['', Validators.required]
    });
  }

  onSelectUser(userId: number) {
    this.selectedUserId = userId;
    const control = this.reviewForm.get('reviewed_user_id');
    if (control) {
      control.setValue(userId);
    }
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.apiService.postReview(this.reviewForm.value).subscribe(
        (response) => {
          console.log('Avis soumis avec succès');
          response.user = this.currentUser;
          response.reviewed_user = this.users.find(u => u.id === this.selectedUserId);
          this.allReviews.unshift(response);
          this.reviewForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la soumission de l\'avis', error);
        }
      );
    }
  }
  
  
  loadUsers() {
    this.apiService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }
  loadAllReviews() {
    this.apiService.getAllReviews().subscribe(reviews => {
      this.allReviews = reviews;
      this.filteredReviews = reviews; // Initialise filteredReviews avec tous les avis
    }, error => {
      console.error('Erreur lors du chargement des avis', error);
    });
  }

  onSearchChange(searchValue: string) {
    this.searchQuery = searchValue;
    this.filterReviews();
  }

  filterReviews() {
    if (this.searchQuery) {
      this.filteredReviews = this.allReviews.filter(review =>
        review.reviewed_user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredReviews = this.allReviews;
    }
  }
}