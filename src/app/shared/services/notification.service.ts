import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { NotifyDistrito } from '../models/notifyDistrito';
import { NotifyProvincia } from '../models/notifyProvincia';
import { NotifyRegion } from '../models/notifyRegion';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  static path = environment.APIEndpoint + '/notification/';

  constructor(private http: HttpClient) { }

  notifyUsersByRegion(item: NotifyRegion): Observable<any> {
    return this.http.post<any>(NotificationService.path + 'departamento/', item);
  }
  
  notifyUsersByProvincia(item: NotifyProvincia): Observable<any> {
    return this.http.post<any>(NotificationService.path + 'provincia/', item);
  }

  notifyUsersByDistrito(item: NotifyDistrito): Observable<any> {
    return this.http.post<any>(NotificationService.path + 'distrito/', item);
  }

  notifyConfirmedCase(person: Person): Observable<any>{
    return this.http.post<any>(NotificationService.path + 'report-case/', person);
  }
  notifyRecoverCase(person: Person): Observable<any>{
    return this.http.post<any>(NotificationService.path + 'report-recover/', person);
  }
 
}
