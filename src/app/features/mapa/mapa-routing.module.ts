import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { MaparutasComponent } from './components/maparutas/maparutas.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rutas',
    component: MaparutasComponent,
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaRoutingModule { }
