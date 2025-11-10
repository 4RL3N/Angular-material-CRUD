import { Routes } from '@angular/router';
import {Cadastro} from './cadastro/cadastro';
import {Consulta} from './consulta/consulta';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'cadastro', component: Cadastro },
    { path: 'consulta', component: Consulta },
    { path: 'home', component: Home }
];
