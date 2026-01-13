import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Employee } from './pages/employee/employee';
import { LeaveBalance } from './pages/leave-balance/leave-balance';
import { LeaveRequest } from './pages/leave-request/leave-request';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: "login",
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Header,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'employee',
                component: Employee
            },
            {
                path: 'balance',
                component: LeaveBalance
            },
            {
                path: 'leave-request',
                component: LeaveRequest
            }
        ]
    }
];
