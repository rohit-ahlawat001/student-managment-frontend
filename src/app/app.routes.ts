import { Routes } from '@angular/router';
import { StudentsList } from './pages/students-list/students-list';
import { StudentsDetials } from './pages/students-list/students-detials/students-detials';
import { StudentDashboardComponent } from './pages/students-list/student-dashboard/student-dashboard';
import { AddStudentFee } from './pages/add-student-fee/add-student-fee';
import { LoginComponent } from './pages/login-flow/login-flow';

export const routes: Routes = [
     {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: StudentDashboardComponent,
        pathMatch: 'full'
    },
      {
        path: 'student-list',
        component: StudentsList,
        pathMatch: 'full'
    },
    {
        path: 'student-details',
        component: StudentsDetials,
    },
    {
        path: 'add-student',
        component: AddStudentFee,
    },
    { path: '**', redirectTo: '/login' }
];
