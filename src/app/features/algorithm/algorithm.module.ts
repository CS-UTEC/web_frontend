import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgorithmRoutingModule } from './algorithm-routing.module';
import { AlgorithmComponent } from './algorithm.component';
import { MaterialModule } from 'src/app/material.module';
import { AlgorithmService } from './algorithm.service';


@NgModule({
  declarations: [AlgorithmComponent],
  imports: [
    CommonModule,
    AlgorithmRoutingModule
  ],
  providers: [
    AlgorithmService
  ]
})
export class AlgorithmModule { }
