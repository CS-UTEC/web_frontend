import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { httpInterceptorProviders } from './interceptors';
import { ConfirmDialogComponent, InformationDialogComponent } from './components';
import { NotificationService, DataService } from './services';


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
        httpInterceptorProviders
      ]

    }
  }
 }
