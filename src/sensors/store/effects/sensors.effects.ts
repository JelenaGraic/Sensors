import { Injectable } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions/sensors.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable()

export class SensorsEffects {



  loadSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadSensors),
      switchMap(() =>
        this.service.getAll().pipe(
          map(sensors => fromActions.loadSensorsSuccess({ sensors: sensors.sensors })),
          catchError(error =>
            of(fromActions.loadSensorsFailure(error))
          )
        )
      )
    )
  );

  deleteSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteSensor),
      mergeMap((action) =>
        this.service.deleteSensor(action.id).pipe(
          map(sensor => fromActions.deleteSensorSuccess({ id: sensor.id })),
          tap(() => this.snackBar.open("Data succesuccessfully deleted!", "", {duration: 2000})),
          catchError(error =>
            of(fromActions.deleteSensorFailure(error))
          )
        )
      )     
    )
  );


  addSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addSensor),
      concatMap((action) =>
        this.service.addSensor(action.sensor).pipe(
          map(sensor => fromActions.addSensorSuccess({ sensor: sensor })),
          tap(() => this.snackBar.open("Data succesuccessfully deleted!", "", {duration: 2000})),
          tap(() => this.router.navigate([''])),
          catchError(error =>
            of(fromActions.addSensorFailure(error))
          )
        )
      )   
    )
  );



  constructor( private service: SensorService, 
               private actions$: Actions, 
               private snackBar: MatSnackBar,
               private router: Router) {}
}