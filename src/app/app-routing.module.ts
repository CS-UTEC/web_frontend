import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mapa'
  },
  {
    path: 'mapa',
    loadChildren: () => import('./features/mapa/mapa.module').then(mod => mod.MapaModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false,
      useHash: false,
      anchorScrolling: 'enabled'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
