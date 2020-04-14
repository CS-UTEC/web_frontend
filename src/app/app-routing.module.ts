import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /*
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
  }*/
  {
    path: 'algorithm',
    pathMatch: 'full',
    loadChildren: () => import('./features/algorithm/algorithm.module').then(mod => mod.AlgorithmModule),
  },
  {
    path: '**',
    redirectTo: '/algorithm'
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
