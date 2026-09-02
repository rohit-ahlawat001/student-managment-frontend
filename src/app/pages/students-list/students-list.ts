// src/app/students-list.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule,], 
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList implements OnInit {
  students:any;
  // 1. Inject the HttpClient
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

    constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}


  // 2. Create an array to store the incoming data


  ngOnInit() {
    this.getContactInfo();
  }

  getContactInfo() {
    let url = `http://127.0.0.1:8000/students_list`;
    
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.students = data;
        console.log(this.students, 'this.students');
        this.cdr.detectChanges();
        
        // 2. Use .set() to update the signal and trigger the UI
      },
      error: (error) => {
        console.error("There was an error!", error);
      }
    });
  }
  detialsRedirecction(id: any){
   this.router.navigate(['/student-detials'], { queryParams: { id: id }});
  }
}
