import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  showPassword = false;
  errorMessage = '';
  isLoading = false;

  private masterService = inject(MasterService);
  private router = inject(Router);

  loginFrom: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  clearError() {
    this.errorMessage = '';
  }

  onLogin() {
    const formValue = this.loginFrom.value;
    this.masterService.onLogin(formValue).subscribe({
      next: (response: any) => {
        localStorage.setItem('leaveUser', JSON.stringify(response));
        if (response.role === 'Hr') {
          this.router.navigate(['/employee']);
        } else {
          this.router.navigate(['/leave-request']);
        }
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'An error occurred during login.';
        alert(error.error.message || 'An error occurred during login.');
      }
    })
  }
}