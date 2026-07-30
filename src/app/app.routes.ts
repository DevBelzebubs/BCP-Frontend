import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Login } from './features/auth/login/login';
import { Application } from './features/auth/application/application';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'login', component: Login },
    { path: 'abrir-cuenta', component: Application },
    { path: 'register/apply', component: Register },
    { path: 'dashboard', loadChildren: () => import('./routes/dashboard.routes').then(m => m.dashboardRoutes) },
];
