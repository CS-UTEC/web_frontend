import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectionService } from 'src/app/shared/services';
import { ClusterSelection } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { AnuncioComponent } from '../anuncio/anuncio.component';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent {

  removable = true;
  data: ClusterSelection;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SeleccionComponent>,
    private selectService: SelectionService,
    private anuncio: MatDialog,
    ){
      this.data = this.selectService.getAllSelectedMarkers();
   }
   
   remove(type:string, ubigeo: string){
     this.selectService.delete(type, ubigeo);
   }

   removeAll(type: string){
     this.selectService.clear(type);
   }

   openAnuncio(type: string){
    this._bottomSheetRef.dismiss();
    this.anuncio.open(
      AnuncioComponent,
      {
        width: '400px',
        data: type
      }
      );
  }

}
