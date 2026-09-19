import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-add-student-fee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-fee.html',
  styleUrl: './add-student-fee.scss',
})
export class AddStudentFee {

  studentForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  courses: string[] = ['MCA', 'BCA', 'BTech', 'BBA', 'MBA'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', [Validators.required]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      fee_paid_amount: [0, [Validators.required, Validators.min(0)]],
      fee_paid_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      pending_fee_amount: [0, [Validators.required, Validators.min(0)]],
      next_fee_date: [null]
    });

    // Auto-clear next_fee_date if pending fee becomes 0
    this.studentForm.get('pending_fee_amount')?.valueChanges.subscribe(pending => {
      const nextFeeControl = this.studentForm.get('next_fee_date');
      if (pending === 0) {
        nextFeeControl?.setValue(null);
        nextFeeControl?.clearValidators();
      } else {
        nextFeeControl?.setValidators([Validators.required]);
      }
      nextFeeControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.studentForm.value;

    // Derived flag for status
    const payload = {
      ...formValue,
      is_fee_fully_paid: Number(formValue.pending_fee_amount) === 0
    };

    const url = 'http://127.0.0.1:8000/create_student'; // Your FastAPI POST endpoint

    this.http.post<any>(url, payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response?.message || 'Student fee record created successfully!';
        console.log(response, "astudent data created")
        // Redirect to student list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/student-list']);
        }, 1000);
      },
      error: (error) => {
        console.error('Error adding student:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.detail || 'Failed to add student. Please check your backend connection.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
