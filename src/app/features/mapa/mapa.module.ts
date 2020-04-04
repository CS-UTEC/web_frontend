import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DxChartModule } from 'devextreme-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { SeleccionComponent } from './components/seleccion/seleccion.component';
import { ReportarComponent } from './components/reportar/reportar.component';

@NgModule({
  declarations: [
    MapComponent,
    AnuncioComponent, 
    SeleccionComponent, ReportarComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MapaRoutingModule,
    FlexLayoutModule,
    DxChartModule,
    NgxChartsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    AnuncioComponent,
    SeleccionComponent,
    ReportarComponent
  ]
})
export class MapaModule { }

