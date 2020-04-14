import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  static endPoint = 'http://localhost:8080/simulation/';

  constructor(private http: HttpClient) { }

  getData(n: number, s: number): Observable<any> {
    return this.http.get<any>(AlgorithmService.endPoint + 'generate-users/'+ n + '/' + s);
  }
}
