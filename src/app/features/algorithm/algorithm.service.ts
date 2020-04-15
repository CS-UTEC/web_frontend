import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  static endPoint = 'http://localhost:8080/simulation/';
  
  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

   /**
   * Get the data from the API
   * @function getFromAPI
   * @return {Observable<any>}
   */

  getData(n: number, sqr_size: number): Observable<any> {
    return this.http.get<any>(AlgorithmService.endPoint + 'generate-users/'+ n + '/' + sqr_size);
  }

  getDataFromGPSEvents(sqr_size: number){
    return this.http.get<any>(AlgorithmService.endPoint + 'create_gps_events/'+ sqr_size);
  }

  getDataFromBluetoothEvents(sqr_size: number){
    return this.http.get<any>(AlgorithmService.endPoint + 'create_bluetooth_events/'+ sqr_size);
  }

  runAlgorithm(points: Array<string>){
    return this.http.post<any>(AlgorithmService.endPoint + 'run', {id:points});
  }

  
  
}
