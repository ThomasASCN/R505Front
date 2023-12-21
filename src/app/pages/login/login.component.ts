import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {};
  loginForm: FormGroup;
 
  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.apiService.login(loginData).then(
        response => {
          this.apiService.savTokens(response.token);
          this.router.navigate(['/home']); 
        },
        error => {
          console.error('Erreur lors de la connexion', error);
        }
      );
    }
  }
}
