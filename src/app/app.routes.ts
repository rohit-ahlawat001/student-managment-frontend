import { Routes } from '@angular/router';
import { StudentsList } from './pages/students-list/students-list';
import { StudentsDetials } from './pages/students-list/students-detials/students-detials';
import { StudentDashboardComponent } from './pages/students-list/student-dashboard/student-dashboard';
import { AddStudentFee } from './pages/add-student-fee/add-student-fee';
import { LoginComponent } from './pages/login-flow/login-flow';
import { ProfilePage } from './pages/profile/profile';
import { authGuard, guestGuard } from './auth/auth.guard';

export const routes: Routes = [
     {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: StudentDashboardComponent,
        canActivate: [authGuard],
        pathMatch: 'full'
    },
      {
        path: 'student-list',
        component: StudentsList,
        canActivate: [authGuard],
        pathMatch: 'full'
    },
    {
        path: 'student-details',
        component: StudentsDetials,
        canActivate: [authGuard],
    },
    {
        path: 'add-student',
        component: AddStudentFee,
        canActivate: [authGuard],
    },
    {
        path: 'profile',
        component: ProfilePage,
        canActivate: [authGuard],
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '/login' }
];
