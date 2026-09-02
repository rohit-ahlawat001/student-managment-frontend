// src/app/pages/students-list/students-detials/students-detials.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-detials',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './students-detials.html',
  styleUrl: './students-detials.scss',
})
export class StudentsDetials implements OnInit {

  studentsDetails: any;

  // 1. Inject the necessary services
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private activateRoute = inject(ActivatedRoute);

  ngOnInit() {
    // 2. Subscribe to queryParams to grab the 'id' from the URL
    this.activateRoute.queryParams.subscribe(params => {
      const studentId = params['id'];
      
      if (studentId) {
        // Pass the ID to your HTTP call
        this.getContactInfo(studentId);
      }
    });
  }

  getContactInfo(id: string) {
    // 3. Append the ID directly to your FastAPI endpoint
    let url = `http://127.0.0.1:8000/student-view/${id}`;
    
    // Changed <any[]> to <any> because FastAPI returns a single object here, not an array
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.studentsDetails = data;
        console.log('Student Data received:', this.studentsDetails);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("There was an error!", error);
      }
    });
  }
}