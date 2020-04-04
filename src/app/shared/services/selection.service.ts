import { Injectable } from '@angular/core';
import { ClusterSelection } from '../models';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selectedMarkers = new ClusterSelection();

  constructor(private ds: DataService) {
    this.initSelectedMarkers();
  }

  initSelectedMarkers(){
    this.selectedMarkers.confirmados = new Map();
    this.selectedMarkers.recuperados = new Map();
    this.selectedMarkers.neutral = new Map();
  }

  getAllSelectedMarkers(): ClusterSelection{
    return this.selectedMarkers;
  }

  add(type: string, ubigeo: string, nombre: string){
    if (type === "Confirmed") this.selectedMarkers.confirmados.set(ubigeo, nombre);
    else if(type === "Neutral")  this.selectedMarkers.neutral.set(ubigeo, nombre);
    else if(type === "Recovered") this.selectedMarkers.recuperados.set(ubigeo, nombre);
  }

  has(type: string, ubigeo: string): boolean{
    if (type === "Confirmed") return this.selectedMarkers.confirmados.has(ubigeo);
    else if(type === "Neutral")  return this.selectedMarkers.neutral.has(ubigeo);
    else if(type === "Recovered") return this.selectedMarkers.recuperados.has(ubigeo);
  }

  addSelectedMarkers(type: string, ubigeos: Array<string>){
    for (let i = 0; i < ubigeos.length; i++){
      if(!this.has(type, ubigeos[i])){
        let name = this.ds.getDistrictNameByUbigeo(ubigeos[i]);
        this.add(type, ubigeos[i], name);
      }
    }
  }

  delete(type: string, ubigeo: string){
    if (type === "Confirmed") this.selectedMarkers.confirmados.delete(ubigeo);
    else if(type === "Neutral")  this.selectedMarkers.recuperados.delete(ubigeo);
    else if(type === "Recovered") this.selectedMarkers.neutral.delete(ubigeo);
  }


  clear(type: string){
      if (type === "Confirmed") this.selectedMarkers.confirmados.clear();
      else if(type === "Neutral")  this.selectedMarkers.neutral.clear();
      else if(type === "Recovered") this.selectedMarkers.recuperados.clear();
  }

  clearAll(){
      this.selectedMarkers.confirmados.clear();
      this.selectedMarkers.recuperados.clear();
      this.selectedMarkers.neutral.clear();
  }
}
