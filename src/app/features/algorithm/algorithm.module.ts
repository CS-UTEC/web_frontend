import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgorithmRoutingModule } from './algorithm-routing.module';
import { AlgorithmComponent } from './algorithm.component';
import { MaterialModule } from 'src/app/material.module';
import { AlgorithmService } from './algorithm.service';
import { DxChartModule } from 'devextreme-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlgorithmComponent],
  imports: [
    CommonModule,
    DxChartModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    AlgorithmRoutingModule
  ],
  providers: [
    AlgorithmService
  ]
})
export class AlgorithmModule { }
