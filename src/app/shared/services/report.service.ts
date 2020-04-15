import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  static path = environment.APIEndpoint + '/notification/';

  constructor(private http: HttpClient) { }

  reportConfirmedCase(person: Person): Observable<any>{
    return this.http.post<any>(ReportService.path + 'report-case/', person);
  }
  reportRecoverCase(person: Person): Observable<any>{
    return this.http.post<any>(ReportService.path + 'report-recover/', person);
  }
}
