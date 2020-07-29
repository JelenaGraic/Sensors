import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorList } from '../models/sensor-list';
import { map } from 'rxjs/operators';

const URL = 'http://localhost:3000/sensors';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getAll (): Observable<SensorList> {
    return this.http.get(URL).pipe(map( data => new SensorList(data) ))
  }
}
