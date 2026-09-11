import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Structure matching backend dashboard_data payload
export interface DashboardData {
  total_students: number;
  total_fee_collected: number;
  total_pending_fee: number;
  fully_paid_students: number;
  pending_paid_students: number;
  course_breakdown: { [key: string]: number };
  recent_pending_payments: any[];
}

// @Component({
//   selector: 'app-student-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './student-dashboard.component.html',
//   styleUrls: ['./student-dashboard.component.scss']
// })
@Component({
  selector: 'app-student-dashboard',
   imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.isLoading = true;
    const url = 'http://127.0.0.1:8000/student_dashboard';

    this.http.get<DashboardData>(url).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
        this.errorMessage = 'Failed to load dashboard data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  // Convert object key-value pairs to array for @for loop rendering
  get courseList() {
    if (!this.dashboardData?.course_breakdown) return [];
    return Object.keys(this.dashboardData.course_breakdown).map(course => ({
      name: course,
      count: this.dashboardData!.course_breakdown[course]
    }));
  }
}