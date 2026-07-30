import { Routes } from '@angular/router';
import { authGuard } from './core';
import { Landing } from './features/landing/landing';
import { Login } from './features/auth/login/login';
import { Application } from './features/auth/application/application';
import { Register } from './features/auth/register/register';
import { DashboardRouter } from './components/dashboard-router/dashboard-router';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'login', component: Login },
    { path: 'abrir-cuenta', component: Application },
    { path: 'register/apply', component: Register },
    { path: 'dashboard', canActivate: [authGuard], component: DashboardRouter },
    { path: 'dashboard/cliente', loadChildren: () => import('./routes/dashboard-cliente.routes').then(m => m.clienteRoutes) },
    { path: 'dashboard/empleado', loadChildren: () => import('./routes/dashboard-empleado.routes').then(m => m.empleadoRoutes) },
    { path: 'dashboard/asesor', loadChildren: () => import('./routes/dashboard-asesor.routes').then(m => m.asesorRoutes) },
    { path: 'dashboard/backoffice', loadChildren: () => import('./routes/dashboard-backoffice.routes').then(m => m.backofficeRoutes) },
    { path: 'dashboard/admin', loadChildren: () => import('./routes/dashboard-admin.routes').then(m => m.adminRoutes) },
];
