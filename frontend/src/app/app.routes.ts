import { Routes } from '@angular/router';
import { ListaPoliciaisComponent } from './components/lista-policiais/lista-policiais.component';
import { CadastroPolicialComponent } from './components/cadastro-policial/cadastro-policial.component';

export const routes: Routes = [
  { path: 'policiais', component: ListaPoliciaisComponent },
  { path: 'cadastrar', component: CadastroPolicialComponent },
  { path: '', redirectTo: '/policiais', pathMatch: 'full' },
  { path: '**', redirectTo: '/policiais' }
];