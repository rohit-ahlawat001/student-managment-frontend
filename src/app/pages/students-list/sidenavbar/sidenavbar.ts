import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  imports: [],
  templateUrl: './sidenavbar.html',
  styleUrl: './sidenavbar.scss',
})
export class Sidenavbar {
  ngOnInit() {}

  constructor(
     private router: Router,
    private activateRoute: ActivatedRoute,
  ) 
  {}

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
    this.router.navigate(['/  ']);
  }
}
