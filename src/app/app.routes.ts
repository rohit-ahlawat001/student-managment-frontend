import { Routes } from '@angular/router';
import { StudentsList } from './pages/students-list/students-list';
import { StudentsDetials } from './pages/students-list/students-detials/students-detials';
import { StudentDashboardComponent } from './pages/students-list/student-dashboard/student-dashboard';

export const routes: Routes = [
    {
        path: '',
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
    }
];
