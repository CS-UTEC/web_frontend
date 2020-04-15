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
  
  static path = environment.APIEndpoint + '/map/';

  constructor(private http: HttpClient) { }

  
  notifyUbigeos(item: NotifyRegion): Observable<any>{
    return this.http.post<any>(NotificationService.path + 'notify-region/', item);
  }
 
}
