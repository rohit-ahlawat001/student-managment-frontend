import { Component, OnInit, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-student-dashboard',
   imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboardComponent implements OnInit {
  readonly dashboardData = signal<DashboardData | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly courseList = computed(() => {
    const courseBreakdown = this.dashboardData()?.course_breakdown;

    if (!courseBreakdown) {
      return [];
    }

    return Object.entries(courseBreakdown).map(([name, count]) => ({ name, count }));
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('dashboard init');
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    const url = 'http://127.0.0.1:8000/student_dashboard';

    this.http.get<DashboardData>(url).subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
        this.errorMessage.set('Failed to load dashboard data. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }
    cehcingFin(){
    console.log("checkingFin");
    this.router.navigate(['/student-list']);
  }
}
