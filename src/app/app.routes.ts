import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Login } from './login/login';
import { AbrirCuenta } from './abrir-cuenta/abrir-cuenta';
import { RegistroCuenta } from './abrir-cuenta/registro/registro';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'login', component: Login },
    { path: 'abrir-cuenta', component: AbrirCuenta },
    { path: 'abrir-cuenta/registro', component: RegistroCuenta },
];
