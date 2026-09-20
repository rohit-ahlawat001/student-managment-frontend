import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login-flow',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-flow.html',
  styleUrl: './login-flow.scss',
})


export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signUpForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  this.signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
}
  signUpForm: FormGroup
  signInForm: FormGroup
  activeTab: 'signin' | 'signup' = 'signin';
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  loginSuccess: any = 1
 
 
  // Validations match the backend rules
 
 
  switchTab(tab: 'signin' | 'signup') {
    this.activeTab = tab;
    this.showPassword = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
 
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
 
  // True when a field was touched and is invalid -> used to show the error text
  hasError(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!control && control.invalid && control.touched;
  }
 
  onSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const url = 'http://127.0.0.1:8000/login';
  this.http.post(url, this.signInForm.getRawValue()).subscribe({
      next: () => {
        // this.isLoading = false;
        this.router.navigate(['/dashboard']);
        // window.location.reload();
        this.successMessage = 'Account created. Please sign in.';
        localStorage.setItem("loginSuccess", this.loginSuccess)
      },
      error: (error) => {
        console.error('Error creating account:', error);
        this.isLoading = false;
      },
    });
  }
 
  onSignUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
 
    this.isLoading = true;
    this.errorMessage = '';
    const url = 'http://127.0.0.1:8000/aadmin_Create';
 
    // Sends { firstName, lastName, email, phone, password }
    this.http.post(url, this.signUpForm.getRawValue()).subscribe({
      next: () => {
        // this.isLoading = false;
        localStorage.setItem("loginSuccess", this.loginSuccess)
        this.router.navigate(['/dashboard']);
        window.location.reload();
        this.signUpForm.reset();
        this.successMessage = 'Account created. Please sign in.';
      },
      error: (error) => {
        console.error('Error creating account:', error);
        this.errorMessage =
          typeof error.error?.detail === 'string'
            ? error.error.detail
            : 'Failed to create account. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
 