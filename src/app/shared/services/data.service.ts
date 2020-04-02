import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MapUser } from '../models/mapUser.model';
import { HttpParams } from "@angular/common/http";
import { Case } from '../models/case.model';
import { map } from 'rxjs/operators';
import * as disData from '../../features/mapa/components/map/data/dist.json';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static path = environment.APIEndpoint + '/map/data';
  private distrito: any;

  constructor(private http: HttpClient) { 
    this.distrito = (disData as any).default;
  }

  private getLatLong(ubigeo: any):any {
    let ub = ubigeo.match(/.{1,2}/g)
    let latLong: Array<any> = [];
    let dist = this.distrito.filter(x => x.id == ub[0] && x.idp == ub[1] && x.idd == ub[2])[0];
    latLong.push(dist.latitud, dist.longitud);
    return latLong;
  }

  private extractData(res: Response) {
    const body = res.json();
    body.then(
      bod => bod.map(
        item => {
          item.map(
            i => {
              
            }
          )
        }
      )
    )
    return body || {};
}

  getAllData(item: MapUser): Observable<Data> {
    return this.http.post(DataService.path, item).pipe(
      map(this.extractData)
    )
  }

  getDataConfirmed(item: MapUser): Observable<Case[]>{
    return this.http.post(DataService.path, item).pipe(
      map(res => {
        return res['confirmed'].map(item => {
          let latLong = this.getLatLong(item.ubigeo);
          return new Case(
            item.ubigeo,
            item.casos,
            latLong[0],
            latLong[1]
          );
        });
      })
    )
  }

  getDataNeutral(item: MapUser): Observable<Case[]>{
    return this.http.post(DataService.path, item).pipe(
      map(res => {
        return res['neutral'].map(item => {
          let latLong = this.getLatLong(item.ubigeo);
          return new Case(
            item.ubigeo,
            item.casos,
            latLong[0],
            latLong[1]
          );
        });
      })
    )
  }

  getDataRecovered(item: MapUser): Observable<Case[]>{
    return this.http.post(DataService.path, item).pipe(
      map(res => {
        return res['recovered'].map(item => {
          let latLong = this.getLatLong(item.ubigeo);
          return new Case(
            item.ubigeo,
            item.casos,
            latLong[0],
            latLong[1]
          );
        });
      })
    )
  }

}
