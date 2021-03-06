import { Injectable } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap, concatMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions/sensors.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, UrlSegment } from '@angular/router';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION, RouterNavigatedAction, RouterNavigationAction } from '@ngrx/router-store';


@Injectable()

export class SensorsEffects {



  loadSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadSensors),
      switchMap((action) =>
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
      mergeMap((action) =>
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

  editSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateSensor),
      concatMap( action =>
        this.service.updateSensor(
          action.sensor.id,
          action.sensor.changes)
    ),
    tap(() => {this.router.navigate([''])}
    ),
    tap(() => this.snackBar.open("Data succesuccessfully updated!", "", {duration: 2000})),  
    ),
    { dispatch: false }
  );



  constructor( private service: SensorService, 
               private actions$: Actions, 
               private snackBar: MatSnackBar,
               private router: Router) {}
}