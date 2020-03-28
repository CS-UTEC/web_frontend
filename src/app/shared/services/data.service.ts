import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MapUser } from '../models/mapUser.model';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static path = environment.APIEndpoint + '/map/data/';

  constructor(private http: HttpClient) { }

  getData(item: any): Observable<any> {

    return this.http.post<any>(DataService.path, {body: item});
  }

}
