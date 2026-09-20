import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  imports: [CommonModule],
  templateUrl: './sidenavbar.html',
  styleUrl: './sidenavbar.scss',
})
export class Sidenavbar {
  loginValue:any

  ngOnInit() {
    // debugger
    this.loginValue =  localStorage.getItem('loginSuccess');
  }

  constructor(
     private router: Router,
    private activateRoute: ActivatedRoute,
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
  logOut(){
     localStorage.clear();
     this.router.navigate(['/login']);
     window.location.reload();
  }
}
