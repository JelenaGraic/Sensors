import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorList } from '../models/sensor-list';
import { map } from 'rxjs/operators';
import { Sensor } from '../models/sensor';

const URL = 'http://localhost:3000/sensors';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getAll (params?: any): Observable<SensorList> {

    let queryParams = {};
    if (params){
      queryParams ={ params: new HttpParams()
        .set('q', params.all)
      } 
    }
    return this.http.get(URL, queryParams).pipe(map( data => new SensorList(data) ))
  }

  addSensor (newSensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(URL,newSensor);
  }

  updateSensor (updatedSensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(URL + "/" + updatedSensor.id, updatedSensor);
  }

  getOneSensor (id: number): Observable<Sensor> {
    return this.http.get<Sensor>(URL + '/' + id);
  }
}
