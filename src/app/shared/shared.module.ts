import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { InformationDialogComponent } from './components/information-dialog/information-dialog.component';
import { MaterialModule } from '../material.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NotificationService } from './services/notification.service';
import { DataService } from './services/data.service';
import { httpInterceptorProviders } from './interceptors';


@NgModule({
  /*Directives, components, pipes goes here*/

  declarations: [
    ConfirmDialogComponent, 
    InformationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent, 
    InformationDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        /*Acá van los servicios */
        NotificationService,
        DataService,
        //httpInterceptorProviders
      ]

    }
  }
 }
