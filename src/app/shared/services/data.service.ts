import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as regData from './data/dep.json';
import * as provData from './data/prov.json';
import * as disData from './data/dist.json';
import { Case, RangoFecha, Data } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  static path = environment.APIEndpoint + '/map/data';

  private regiones: any;
  private provincias: any;
  private distritos: any;
  

  constructor(private http: HttpClient) {
    this.regiones = (regData as any).default;
    this.provincias = (provData as any).default;
    this.distritos = (disData as any).default;
  }

  /* Getters */

  getRegion (){
    return this.regiones;
  }

  getProvincia (){
    return this.provincias;
  }

  getDistrito (){
    return this.distritos;
  }

  getRegionId(nombreRegion: string): string{
    return this.regiones.find(x => x.departamento == nombreRegion).id;
  }


  getLatLongFirstDistrict(type: string, id: string, idp?: string):any {
    let latLong: Array<any> = [];
    if (type == "dep"){
      let dist = this.distritos.filter(x => x.id == id)[0];
      latLong.push(dist.latitud, dist.longitud);
    }else if( type == "prov"){
      let dist = this.distritos.filter(x => x.id == id && x.idp == idp)[0];
      latLong.push(dist.latitud, dist.longitud);
    }
    return latLong;
  }

  getDistrictNameByUbigeo(ubigeo: string): string{
    let ub = ubigeo.match(/.{1,2}/g)
    let dis = this.distritos.filter(x => x.id == ub[0] && x.idp == ub[1] && x.idd == ub[2])[0];
    return dis.distrito;
  }

  /* Utilitarios */

  private getLatLong(ubigeo: any):any {
    let ub = ubigeo.match(/.{1,2}/g)
    let latLong: Array<any> = [];
    let dist = this.distritos.filter(x => x.id == ub[0] && x.idp == ub[1] && x.idd == ub[2])[0];
    latLong.push(dist.latitud, dist.longitud);
    return latLong;
  }

  private addLatLong(data: any, param: string): Case[] {
    return data[param].map((item: { ubigeo: string; casos: number; }) => {
      let latLong = this.getLatLong(item.ubigeo);
      return new Case(
        item.ubigeo,
        item.casos,
        latLong[0],
        latLong[1]
      );
    });
  }

  /* Request */

  getAllData(item: RangoFecha): Observable<Data> {
 
    return this.http.post(DataService.path, item).pipe(
      map(res => {
        let conf = this.addLatLong(res, "confirmed");
        let rec = this.addLatLong(res, "recovered");
        let neu = this.addLatLong(res, "neutral");
        let data = new Data(conf, neu, rec);
        return data;
      })
    )
  }

  getDataByType(item: RangoFecha, type: string): Observable<Case[]>{
    return this.http.post(DataService.path, item).pipe(
      map(res => {
        return this.addLatLong(res, type);
      })
    )
  }

  getDataMinsaApp(){
    return this.http.get("https://us-central1-cadi360-sac.cloudfunctions.net/function-pakipe-publish/api/v1/marks")
  }

}
