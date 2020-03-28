import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [MapComponent],
  imports: [
    MaterialModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MapaRoutingModule,
    FlexLayoutModule
  ]
})
export class MapaModule { }
