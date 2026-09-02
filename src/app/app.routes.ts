import { Routes } from '@angular/router';
import { StudentsList } from './pages/students-list/students-list';
import { StudentsDetials } from './pages/students-list/students-detials/students-detials';

export const routes: Routes = [
    {
        path: '',
        component: StudentsList,
        pathMatch: 'full'
    },
    {
        path: 'student-detials',
        component: StudentsDetials,
    }
];
