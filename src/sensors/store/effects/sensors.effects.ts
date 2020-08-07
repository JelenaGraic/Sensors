import { Injectable } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions/sensors.action';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()

export class SensorsEffects {

    constructor( private service: SensorService, 
                 private actions$: Actions, 
                 private snackBar: MatSnackBar) {}

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

  deleteSensors$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.deleteSensor),
    mergeMap((action) =>
      this.service.deleteSensor(action.id).pipe(
        map(sensor => fromActions.deleteSensorSuccess({ id: sensor.id })),
        catchError(error =>
          of(fromActions.loadSensorsFailure(error))
        )
      )
    ),
    tap(() => this.snackBar.open("Data succesuccessfully deleted!", "", {duration: 2000}))
  )
);
}