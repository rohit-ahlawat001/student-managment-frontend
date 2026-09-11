// src/app/students-list.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// import { log } from 'console';.
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
  successMessage: any;
  showDeleteModal: boolean = false;
  selectedStudentId: number | null = null;
  selectedStudentName:any
    constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getContactInfo();
  }

  getContactInfo() {
    let url = `http://127.0.0.1:8000/students_list`;
    
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.students = data;
        // console.log(this.students, 'this.students');
        this.cdr.detectChanges();
        
      },
      error: (error) => {
        console.error("There was an error!", error);
      }
    });
  }
  detialsRedirecction(id: any){
   this.router.navigate(['/student-detials'], { queryParams: { id: id }});
  }

  deleteStudent(id: number) {
    let url = `http://127.0.0.1:8000/students_delete/${id}`;
    this.http.delete<any>(url).subscribe({
      next: (data) => {
        this.successMessage = typeof data === 'string' ? data : (data?.message || 'Student deleted successfully!');
        this.getContactInfo(); // Refresh your listing table

        // Hide success banner automatically after 4 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      error: (error) => {
        console.error("There was an error!", error);
      }
    });
  }

openDeleteModal(data: any) {
    this.selectedStudentId = data.id;
    this.selectedStudentName = data.name;
    this.showDeleteModal = true;
  }
// Close confirmation modal
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedStudentId = null;
  }
  confirmDelete() {
    if (this.selectedStudentId !== null) {
      this.deleteStudent(this.selectedStudentId);
      this.closeDeleteModal();
    }
  }
}
