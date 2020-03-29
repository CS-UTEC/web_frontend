import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    loadChildren: () => import('./features/mapa/mapa.module').then(mod => mod.MapaModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
