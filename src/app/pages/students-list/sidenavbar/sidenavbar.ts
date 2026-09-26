import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidenavbar',
  imports: [CommonModule],
  templateUrl: './sidenavbar.html',
  styleUrl: './sidenavbar.scss',
})
export class Sidenavbar {
  readonly isLogoutModalOpen = signal(false);

  constructor(
     private router: Router,
     private auth: AuthService,
  ) 
  {
  }

  cehcingFin(){
    console.log("checkingFin");
    this.router.navigate(['/student-list']);
  }
  addStudent() {
    console.log("addStudent");
    this.router.navigate(['/add-student']);
  }
  navigateToDashboard() {
    // debugger;
    console.log("navigateToDashboard");
    this.router.navigate(['/dashboard']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  openLogoutModal(): void {
    this.isLogoutModalOpen.set(true);
  }

  closeLogoutModal(): void {
    this.isLogoutModalOpen.set(false);
  }

  confirmLogout(): void {
    this.closeLogoutModal();
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
